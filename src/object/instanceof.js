const isFn = (v) => Object.prototype.toString.call(v) === '[object Function]';

function myInstanceof(obj, constructor) {
  if (!isFn(constructor)) {
    throw new TypeError(`Right-hand side of 'instanceof' is not an object`);
  } else if (typeof constructor !== 'function') {
    throw new TypeError(`Right-hand side of 'instanceof' is not callable`);
  }

  // 主要就这一句
  return constructor.prototype.isPrototypeOf(obj);
}

/**
 *
 */

module.exports = {
  myInstanceofTest() {
    function A() {}
    const a = new A();

    console.log(a instanceof A); // => true
    console.log(myInstanceof(a, A)); // => true
  },
};
