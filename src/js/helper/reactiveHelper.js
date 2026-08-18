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

function timeout(callback, delay = Number()) {
  const start = performance.now();

  function tick(now) {
    if (now - start >= delay) {
      callback();
      return;
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function interval(callback, interval) {
  let lastTime = performance.now();

  function tick(now) {
    if (now - lastTime >= interval) {
      lastTime = now;
      callback();
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}



export const reactiveHelper = { whenDOMLoaded, whenDOMReactive, timeout, interval };

