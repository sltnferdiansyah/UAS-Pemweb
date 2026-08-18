import {animationHandler} from "./helper/animateHelper";
import { reactiveHelper } from "./helper/reactiveHelper";

export function mainPageJS(router) {
    const startButton = document.querySelector(".button-start");

    // reactiveHelper.whenDOMLoaded(()=>{
    //     animationHandler.addIn(1,"anim-1","animate-out-up",0,0,false)
    // })

    startButton?.addEventListener("click", () => {
        router.navigate("/selection");
    });
}
