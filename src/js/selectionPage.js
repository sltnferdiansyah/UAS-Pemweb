import { animationHandler } from "./helper/animateHelper";
import { reactiveHelper } from "./helper/reactiveHelper";
import "../css/selection.css";


export function selectionPageJS(router) {
    const homeButton = document.querySelector(".home-btn");
    let isDebouncePageOnly = false;

    reactiveHelper.whenDOMLoaded(() => {
        animationHandler.addIn(1, "anim-1", "animate-out-1s", 0, 0, false);
    })

    homeButton.addEventListener("click", () => {
        if (!isDebouncePageOnly) {
            isDebouncePageOnly = true
            animationHandler.addIn(1, "anim-1", "animate-in-1s", 0, 0, false, (() => { isDebouncePageOnly = false; router.navigate("/"); }));
        }
    })
}
