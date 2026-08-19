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

// Aku malas untuk membuat file helper baru :P
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

function selectionToolbar(nameClassForm = String(), onChange) {
  const form = document.querySelector(`.${nameClassForm}`);
  if (!form) return () => { };

  const getSelectedValue = (radio) => radio?.id || radio?.value || null;

  const emitCurrent = () => {
    const checked = form.querySelector('input[name="selection_toolbar"]:checked');
    const value = getSelectedValue(checked);
    if (value) onChange?.(value, checked);
  };

  const handleChange = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.name !== 'selection_toolbar') return;

    const value = getSelectedValue(target);
    if (value) onChange?.(value, target);
  };

  form.addEventListener('change', handleChange);

  emitCurrent();

  return () => {
    form.removeEventListener('change', handleChange);
  };
}

export const reactiveHelper = { whenDOMLoaded, whenDOMReactive, timeout, interval, selectionToolbar };

