class Parent1 {
  constructor(type = 'parent1') {
    this.type = type;
  }
  getValue() {
    console.log(this.type);
  }
}

class Child1 extends Parent1 {
  constructor(type) {
    super(type);
  }
}

const isObj = (v) => Object.prototype.toString.call(v) === '[object Object]';
/* new 运算原理 */
function myNew(constructor, ...args) {
  if (typeof constructor !== 'function') throw new TypeError(`${constructor} is not a constructor`);
  // 创建一个原型为构造器的 prototype 的空对象 target
  const target = Object.create(constructor.prototype);
  // 将构造器的 this 指向上一步创建的空对象，并执行，为了给 this 添加实例属性
  // 所以类函数是不应该有返回值的，或者返回值不能为对象，否则 new 得到的就是类函数的返回值了
  const result = constructor.apply(target, args);

  // 上一步的返回如果是对象就直接返回，否则返回 target
  return isObj(result) ? result : target;
}

module.exports = {
  myNewTest() {
    const tc = myNew(Child1, '3313');
    tc.getValue();
  },
};
