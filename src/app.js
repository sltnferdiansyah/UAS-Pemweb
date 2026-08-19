import Navigo from "navigo";
import "./index.css";
import "./css/main.css";
import "./css/selection.css";
import mainPage from "./html/main.html?raw";
import selectionPage from "./html/selection.html?raw";
import somethingPage from "./html/something.html?raw";
import { mainPageJS } from "./js/mainPage.js";
import { selectionPageJS } from "./js/selectionPage.js";

const app = document.querySelector("#app");
const router = new Navigo("/");
const navigationType = performance.getEntriesByType("navigation")[0]?.type;
let isFirstLoad = true;

const domParser = (html) => {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
};

const htmlPage = (html) => {
    const parsedDocument = domParser(html);

    app.replaceChildren(...parsedDocument.body.childNodes);
};

router
    .on("/", () => {
        router.navigate("/main");
    })
    .on("/main", () => {
        htmlPage(mainPage);
        if (navigationType == "reload") {
            mainPageJS(router, false);
        } else {
            if (isFirstLoad) {
            mainPageJS(router, true);
            isFirstLoad = false
            } else {
                mainPageJS(router, false);
            }
        }
        
    })
    .on("/selection", () => {
        htmlPage(selectionPage);
        selectionPageJS(router);
    })
    .on("/04042026", () => {
        htmlPage(somethingPage);
    })
    .resolve();
