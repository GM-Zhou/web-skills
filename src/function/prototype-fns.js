/* eslint-disable no-undef */
/*
 * @Description: 函数的原生方法实现
 * @Date: 2023-02-01 09:36:26
 * @LastEditors: JackyChou
 * @LastEditTime: 2023-03-17 17:55:59
 */

Object.assign(Function.prototype, {
  myCall(context, ...args) {
    const that = context ?? window
    const symbol = Symbol()
    /**
     * 这里把函数本身给到 context
     * 由于 call 是被 function 调用的，所以 call 中的 this 指向函数本身
     * 并通过 context 来调用函数从而使函数内部的 this 指向 context
     */
    that[symbol] = this
    const result = that[symbol](...args)
    delete that[symbol]
    return result
  },
  myApply(context, args) {
    const that = context ?? window
    const symbol = Symbol()
    that[symbol] = this
    let result
    if (args) result = that[symbol](...args)
    else result = that[symbol]()
    delete that[symbol]
    return result
  },
  myBind(context, ...args) {
    if (context == null) context = window
    // 返回一个函数
    return function F() {
      // 因为返回了一个函数，我们可以 new F()，所以需要判断
      if (this instanceof F) {
        return new this(...args, ...arguments)
      }
      // 这边的 apply 严谨点可以自己实现
      return this.apply(context, args.concat(...arguments))
    }
  },
  /**
   * @param {Object} obj
   * @param {ObjectConstructor} constructor
   * @returns {Boolean}
   */
  myInstance(obj, constructor) {
    if (typeof constructor !== 'function') {
      throw new TypeError(`Right-hand side of 'instanceof' is not callable`)
    }
    return constructor.prototype.isPrototypeOf(obj)
  }
})
