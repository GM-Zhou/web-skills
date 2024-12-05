export const throttle = (fn, wait = 300, immediate = true) => {
  let lock = false;
  const call = (...args) => {
    if (!lock) {
      lock = true;
      fn(...args);
      setTimeout(() => {
        lock = false;
      }, wait);
    }
  };
  if (immediate) return call;
  return (...args) => setTimeout(call, wait, ...args);
};

export const debounce = (fn, wait = 300, immediate = true) => {
  let timer;
  if (immediate) {
    let lock = false;
    return (...args) => {
      clearTimeout(timer);
      if (!lock) {
        lock = true;
        fn(...args);
      }
      timer = setTimeout(() => {
        lock = false;
      }, wait);
    };
  }
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(fn, wait, ...args);
  };
};
