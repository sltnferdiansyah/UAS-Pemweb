
// Bekerja di javascript native yayyy! :D

async function addIn(countclass, intialClass, animClass, delay, initialDelay, isOnMount, whenAnimationDone) {
    const getIniElm = document.getElementsByClassName(intialClass);
    const getAnimElm = document.getElementsByClassName(animClass);
    const startTime = performance.now();
    let currIdx = 0;

    for (let index = 0; index <= (countclass - 1); index++) {
        const targetTime = (startTime + initialDelay) + delay * index;
        const tick = () => {    
            const currTime = performance.now();

            if (currTime >= targetTime) {
                if (isOnMount) {
                    getIniElm[index]?.classList.remove(`hide-sequence`);
                }

                getIniElm[index]?.classList.add(animClass);
                getAnimElm[index]?.addEventListener('animationend', () => {
                    getIniElm[index]?.classList.remove(animClass);
                });

                getAnimElm[index]?.addEventListener('animationend', () => {
                    currIdx += 1;
                    if (currIdx === countclass) {
                        whenAnimationDone?.();
                    }
                }, { once: true });

            } else {
                requestAnimationFrame(tick);
            }
        };

        if (isOnMount) {
            getIniElm[index]?.classList.add(`hide-sequence`);
        }

        requestAnimationFrame(tick);
    }
}

async function addClass(countclass, setterClass, classList = Array()) {
    const getIniElm = document.getElementsByClassName(setterClass);
    const getListClass = classList

    for (let index = 0; index <= (countclass - 1); index++) {
        getListClass.forEach((i)=>{
            return getIniElm[index]?.classList.add(i)
        })
    }
}

async function deleteClass(countclass, setterClass, classList = Array()) {
    const getIniElm = document.getElementsByClassName(setterClass);
    const getListClass = classList

    for (let index = 0; index <= (countclass - 1); index++) {
        getListClass.forEach((i)=>{
            return getIniElm[index]?.classList.remove(i)
        })
    }
}

export const animationHandler = { addIn, addClass, deleteClass };
