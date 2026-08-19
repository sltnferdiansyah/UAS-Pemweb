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
    cleanup = reactive() || null;
  };
  run();
  return run;
}

// Aku malas untuk membuat file helper baru :P
function timeout(callback, delay = Number()) {
  const start = performance.now();

  const tick = (now) => {
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

  const tick = (now) => {
    if (now - lastTime >= interval) {
      lastTime = now;
      callback();
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function bindFormRadio(nameClassForm = String(), onChange, debounceDelay = 0) {
  const form = document.querySelector(`.${nameClassForm}`);
  const getSelectedValue = (radio) => radio?.id || radio?.value || null;
  let debounceFrameId = null;
  let debounceStartTime = 0;
  let isLocked = false;
  const radioInputs = Array.from(form?.querySelectorAll('input[type="radio"]'));
  const radioName = radioInputs[0]?.name ?? null;
  const disabledStateMap = new Map(radioInputs.map((radio) => [radio, radio.disabled]));
  

  const clearDebounceFrame = () => {
    if (debounceFrameId !== null) {
      cancelAnimationFrame(debounceFrameId);
      debounceFrameId = null;
    }
  };

  const lockRadios = () => {
    if (isLocked) return;

    radioInputs.forEach((radio) => {
      if (disabledStateMap.get(radio) === false) {
        radio.disabled = true;
      }
    });

    isLocked = true;
  };

  const unlockRadios = () => {
    if (!isLocked) return;

    radioInputs.forEach((radio) => {
      radio.disabled = disabledStateMap.get(radio) ?? false;
    });

    isLocked = false;
  };

  const scheduleDebounce = () => {
    clearDebounceFrame();
    lockRadios();
    debounceStartTime = performance.now();

    const tick = (now) => {
      if (now - debounceStartTime >= debounceDelay) {
        unlockRadios();
        return;
      }

      debounceFrameId = requestAnimationFrame(tick);
    };

    debounceFrameId = requestAnimationFrame(tick);
  };

  const emitCurrent = () => {
    const checked = form?.querySelector('input[type="radio"]:checked');
    const value = getSelectedValue(checked);
    if (value) onChange?.(value, checked);
  };

  const handleChange = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.name !== radioName) return;

    const value = getSelectedValue(target);
    if (!value) return;

    onChange?.(value, target);
    scheduleDebounce();
  };

  form?.addEventListener('change', handleChange);

  emitCurrent();

  return () => {
    form?.removeEventListener('change', handleChange);
    unlockRadios();
  };
}

export const reactiveHelper = { whenDOMLoaded, whenDOMReactive, timeout, interval, bindFormRadio };
