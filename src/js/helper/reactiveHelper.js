function whenDOMLoaded(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback, { once: true });
  } else {
    callback();
  }
}

function whenDOMReactive(reactive) {
    let cleanup = null;
    const run = () => {
        if (typeof cleanup === 'function') {
            cleanup();
        }
        cleanup() = reactive() || null
    };
    run();
    return run;
}

export const reactiveHelper = { whenDOMLoaded, whenDOMReactive };

