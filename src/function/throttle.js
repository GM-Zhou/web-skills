function throttle(fn, during = 300) {
  if (typeof fn !== 'function') throw new TypeError('fn of throttle must be function type!');
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(fn, during, ...args);
      setTimeout(() => {
        timer = null;
      }, during);
    }
  };
}

module.exports = {
  throttle,
  throttleTest() {
    let c = 0;
    const fn = throttle(function tt() {
      console.log(c++);
    }, 2000);

    setInterval(fn, 300);
  },
};
