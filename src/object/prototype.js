/**
 * __proto__ 存在于所有的对象上，prototype 存在于所有的函数上
 * 他俩的关系就是：函数的 prototype 是所有使用 new 这个函数构造的实例的 __proto__。
 * 函数也是对象，所以函数同时有 __proto__ 和 prototype。
*/
function Apple(name = 'apple') {
  this.name = name;
}
const a = new Apple('aaa');
console.log('指向构造函数的 prototype');
console.log(a.__proto__ === Apple.prototype);

console.log(Apple === Apple.prototype.constructor);
console.log(Apple === Apple.prototype.constructor);

/**
 * 原型污染
 * 其实原型污染大多发生在调用会修改或者扩展对象属性的函数时，例如 lodash 的 defaults，jquery 的 extend。预防原型污染最主要还是要有防患意识，养成良好的编码习惯。
 *
 */

// const isObject = (v) => Object.prototype.toString.call(v) === '[object Object]';
const isObject = (v) => typeof v === 'object' || typeof v === 'function';

function merge(a, b) {
  for (var attr in b) {
    if (isObject(a[attr]) && isObject(b[attr])) {
      console.log(attr);
      merge(a[attr], b[attr]);
    } else {
      a[attr] = b[attr];
    }
  }
  return a;
}

function clone(a) {
  return merge({}, a);
}

const admin = {};

const body = require('./body.json');
const cb = JSON.parse(JSON.stringify(body));
// console.log('cb', cb);
const admin1 = clone(cb);
console.log('admin', admin.admin);

/**
 * 预防原型污染
 * Object.create(null) Object.create(null) 创建没有原型的对象，即便你对它设置__proto__ 也没有用，因为它的原型一开始就是 null，没有 __proto__ 的 setter
 * Object.freeze(obj) 可以通过 Object.freeze(obj) 冻结对象 obj，被冻结的对象不能被修改属性，成为不可扩展对象。前面也说过不能修改不可扩展对象的原型，会抛 TypeError：
 */
const obj = Object.create(null);
obj.__proto__ = { hack: '污染原型的属性' };
const obj1 = {};
console.log(obj1.__proto__); // => {}

const obj = Object.freeze({ name: 'xiaoHong' });
obj.xxx = 666;
console.log(obj); // => { name: 'xiaoHong' }
console.log(Object.isExtensible(obj)); // => false
obj.__proto__ = null; // => TypeError: #<Object> is not extensible

/* 一道最近校招面试碰到的和原型相关的面试题 */
function Page() {
  return this.hosts;
}
Page.hosts = ['h1'];
Page.prototype.hosts = ['h2'];

const p1 = new Page();
const p2 = Page();

console.log(p1.hosts); // p1 是 Page 函数的返回值，即 ['h2']
console.log(p2.hosts); // Page 运行时 this 是 window，返回 undefined，undefined.hosts 会报错

/* 运行结果是：先输出 undefiend，然后报错 TypeError: Cannot read property 'hosts' of undefined。

为什么 console.log(p1.hosts) 是输出 undefiend 呢，前面我们提过 new 的时候如果 return 了对象，会直接拿这个对象作为 new 的结果，因此，p1 应该是 this.hosts 的结果，而在 new Page() 的时候，this 是一个以 Page.prototype 为原型的 target 对象，所以这里 this.hosts 可以访问到 Page.prototype.hosts 也就是 ['h2']。这样 p1 就是等于 ['h2']，['h2'] 没有 hosts 属性所以返回 undefined。

为什么 console.log(p2.hosts) 会报错呢，p2 是直接调用 Page 构造函数的结果，直接调用 page 函数，这个时候 this 指向全局对象，全局对象并没 hosts 属性，因此返回 undefined，往 undefined 上访问 hosts 当然报错。 */
