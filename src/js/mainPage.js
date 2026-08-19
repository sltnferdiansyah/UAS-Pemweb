import { animationHandler } from "./helper/animateHelper";
import { reactiveHelper } from "./helper/reactiveHelper";
import aboutPage from "../html/partial/about.html?raw";
import mainIntro from "../html/partial/videointro.html?raw";
import loadingSequence from "../html/partial/loadingsequence.html?raw";

export function mainPageJS(router, isFirstLoad = true) {
    const startButton = document.querySelector(".button-start");
    const splashButton = document.querySelector(".reset-spalsh-btn");
    const splashLogo = document.querySelector("#splash-logo")
    let isDebouncePageOnly = false;
    let tempVariable = isFirstLoad


    // DOM loader untuk uhh- windows..?
    const domParser = (html) => {
        const parser = new DOMParser();
        return parser.parseFromString(html, "text/html");
    };

    const windowsPage = (html) => {
        const parsedDocument = domParser(html);
        document.querySelector(".windows-content").replaceChildren(...parsedDocument.body.childNodes);
    };

    // Simpel splash controller
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
        if (isFirstLoad) {
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
        } else {
            stopSplashLogo();
            animationHandler.addClass(1, "splash", ["hidden-thing"]);
            animationHandler.addIn(1, "anim-1", "animate-out-1s", 0, 0, false);
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
                animationHandler.addClass(1, "anim-1", ["keep-overlay"]);
                restartSplashLogo()
                reactiveHelper.timeout(() => {
                    stopSplashLogo();
                    animationHandler.addIn(1, "anim-1", "animate-out", 0, 0, false, () => {
                        animationHandler.deleteClass(1, "anim-1", ["keep-overlay"]);
                    });
                    animationHandler.addIn(1, "splash", "animate-out-text", 500, 0, false, () => {
                        isDebouncePageOnly = false;
                        animationHandler.addClass(1, "splash", ["hidden-thing"]);
                    });
                }, 1905)
            }));
        }
    });

    reactiveHelper.bindFormRadio("toolbar-windows", ((selectedId) => {
        // Coba pakai "switch case" disini :>
        switch (selectedId) {
            case "main":
                if (tempVariable) {
                    tempVariable = false
                    windowsPage(loadingSequence)
                    reactiveHelper.timeout(() => {
                        windowsPage(mainIntro)
                    }, 4500)
                } else {
                    windowsPage(loadingSequence)
                    reactiveHelper.timeout(() => {
                        windowsPage(mainIntro)
                    }, 1200)
                }
                break;
            case "about":
                windowsPage(loadingSequence)
                reactiveHelper.timeout(() => {
                    windowsPage(aboutPage)
                    animationHandler.addIn(4, "anim-2", "initial-in", 150, 0, true)
                }, 1200)
                break;
            default:
                break;
        }
    }), 1400);

}
