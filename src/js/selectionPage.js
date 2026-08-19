import { animationHandler } from "./helper/animateHelper";
import { reactiveHelper } from "./helper/reactiveHelper";
import materi1 from "../html/course/materi1.html?raw";

export function selectionPageJS(router) {
    const homeButton = document.querySelector(".home-btn");
    const courseContent = document.querySelector(".windows-content");
    let isDebouncePageOnly = false;

    const domParser = (html) => {
        const parser = new DOMParser();
        return parser.parseFromString(html, "text/html");
    };

    const htmlPage = (html) => {
        const parsedDocument = domParser(html);

        courseContent.replaceChildren(...parsedDocument.body.childNodes);
    };


    reactiveHelper.whenDOMLoaded(() => {
        animationHandler.addIn(1, "anim-1", "animate-out-1s", 0, 0, false);
    })

    reactiveHelper.bindFormRadio("course-menu", (selectedId) => {
        if (selectedId === "materi1") {
            htmlPage(materi1);
        }
    }, 250);

    homeButton.addEventListener("click", () => {
        if (!isDebouncePageOnly) {
            isDebouncePageOnly = true
            animationHandler.addIn(1, "anim-1", "animate-in-1s", 0, 0, false, (() => { isDebouncePageOnly = false; router.navigate("/"); }));
        }
    })
}
