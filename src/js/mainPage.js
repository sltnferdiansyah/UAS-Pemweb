import {animationHandler} from "./helper/animateHelper";
import { reactiveHelper } from "./helper/reactiveHelper";
import "../css/main.css";

export function mainPageJS(router) {
    const startButton = document.querySelector(".button-start");

    reactiveHelper.whenDOMLoaded(()=>{
        animationHandler.addIn(1,"anim-1","animate-out",0,0,false);
    })

    startButton?.addEventListener("click", () => {
        animationHandler.addIn(1,"anim-1","animate-in-1s",0,0,false,(()=>{router.navigate("/selection")}));

    });
}
