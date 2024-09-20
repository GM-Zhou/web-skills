function debounce(fn, during = 300) {
  if (typeof fn !== 'function') throw new TypeError('fn of debounce must be function type!');
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(fn, during, ...args);
  };
}

module.exports = {
  debounce,
  debounceTest() {
    let c = 0;
    const fn = debounce(function tt() {
      console.log(c++);
    }, 300);

    setInterval(fn, 500);
  },
};
