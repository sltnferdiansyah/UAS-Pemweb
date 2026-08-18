import { animationHandler } from "./helper/animateHelper";
import { reactiveHelper } from "./helper/reactiveHelper";
import "../css/main.css";

export function mainPageJS(router) {
    const startButton = document.querySelector(".button-start");
    const splashButton = document.querySelector(".reset-spalsh-btn");
    const splashLogo = document.querySelector("#splash-logo")
    const navigationType = performance.getEntriesByType("navigation")[0].type;
    let isDebouncePageOnly = false;

    function stopSplashLogo() {
        splashLogo?.querySelectorAll('*').forEach((e) => {
            e.style.animationPlayState = 'paused';
        });
    }

    function startSplashLogo() {
        splashLogo?.querySelectorAll('*').forEach((e) => {
            e.style.animationPlayState = 'running';
        });
    }

    function restartSplashLogo() {
        const nodes = splashLogo?.querySelectorAll('*');
        if (!nodes) return;

        nodes.forEach((e) => {
            e.style.animation = 'none';
        });

        void splashLogo.offsetHeight;

        nodes.forEach((e) => {
            e.style.animation = '';
            e.style.animationPlayState = 'running';
        });
    }

    reactiveHelper.whenDOMLoaded(() => {
        if (navigationType == "reload") {
            stopSplashLogo();
            animationHandler.addClass(1, "splash", ["hidden-thing"]);
            animationHandler.addIn(1, "anim-1", "animate-out-1s", 0, 0, false);
        } else {
            animationHandler.addClass(1, "anim-1", ["keep-overlay"]);
            reactiveHelper.timeout(() => {
                stopSplashLogo();
                animationHandler.addIn(1, "anim-1", "animate-out", 0, 0, false, () => {
                    animationHandler.deleteClass(1, "anim-1", ["keep-overlay"]);
                });
                animationHandler.addIn(1, "splash", "animate-out-text", 500, 0, false, () => {
                    animationHandler.addClass(1, "splash", ["hidden-thing"]);
                });
            }, 1905)
        }
    })

    startButton?.addEventListener("click", () => {
        if (!isDebouncePageOnly) {
            isDebouncePageOnly = true
            animationHandler.addIn(1, "anim-1", "animate-in-1s", 0, 0, false, (() => { isDebouncePageOnly = false; router.navigate("/selection"); }));
        }
    });

    splashButton?.addEventListener("click", () => {
        if (!isDebouncePageOnly) {
            isDebouncePageOnly = true
            animationHandler.deleteClass(1, "splash", ["hidden-thing"]);
            animationHandler.addIn(1, "anim-1", "animate-in-1s", 0, 0, false, (() => {
                isDebouncePageOnly = false;
                animationHandler.addClass(1, "anim-1", ["keep-overlay"]);
                restartSplashLogo()
                reactiveHelper.timeout(() => {
                    stopSplashLogo();
                    animationHandler.addIn(1, "anim-1", "animate-out", 0, 0, false, () => {
                        animationHandler.deleteClass(1, "anim-1", ["keep-overlay"]);
                    });
                    animationHandler.addIn(1, "splash", "animate-out-text", 500, 0, false, () => {
                        animationHandler.addClass(1, "splash", ["hidden-thing"]);
                    });
                }, 1905)
            }));
        }
    });
}
