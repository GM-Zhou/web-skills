/**
 * class 的 extends 使用了寄生组合的方式
 * 对于类 A 和类 B，如果满足 A.prototype.__proto__ === B.prototype，那么 A 原型继承 B
 */
function inherit(sub, parent) {
  sub.prototype = Object.create(parent.prototype, { constructor: sub });
  // 让子类可以访问父类上的静态属性，其实就是定义在构造器自身上的属性
  // 例如父类有 Person.say 属性，子类 Student 通过可以通过 Student.say 访问
  sub.__proto__ = parent;
}

function Parent(type = 'parent') {
  this.type = type;
  this.getValue = function () {
    console.log(this.type);
  };
}

function Child(type = 'Child') {
  Parent.call(this, type);
}

//
inherit(Child, Parent);

const child = new Child('ch');
child.getValue();
console.log('Child.prototype', Child.prototype); // Parent
console.log('Child.prototype.__proto__ ', Child.prototype.__proto__); // Parent.prototype
console.log('child.__proto__', child.__proto__); // Parent
console.log('child instanceof Child', child instanceof Child); // true
console.log('child instanceof Parent', child instanceof Parent); // true
console.log(Child instanceof Parent); // false
