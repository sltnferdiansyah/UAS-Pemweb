import {animationHandler} from "./helper/animateHelper";
import { reactiveHelper } from "./helper/reactiveHelper";
import "../css/selection.css";


export function selectionPageJS() {
    const courseButtons = document.querySelectorAll(".button-course");

    reactiveHelper.whenDOMLoaded(()=>{
        animationHandler.addIn(1,"anim-1","animate-out-1s",0,0,false);
    })

    courseButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            console.log(`Course button ${index + 1} clicked`);
        });
    });
}
