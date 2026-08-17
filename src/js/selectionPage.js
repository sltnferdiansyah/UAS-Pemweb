export function selectionPageJS() {
    const courseButtons = document.querySelectorAll(".button-course");

    courseButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            console.log(`Course button ${index + 1} clicked`);
        });
    });
}
