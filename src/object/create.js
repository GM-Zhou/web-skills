/* Object.create 底层实现 */
// Object.create = function (o) {
//   function F() {}
//   F.prototype = o;
//   return new F(); // 此处返回的值的 __proto__ 就指向了 F.prototype = o
// };

//创建一个Obj对象
const obj = {
  name: "mini",
  age: 3,
  show: function () {
    console.log(this.name + " is " + this.age);
  },
};
// myObj 继承 obj, __proto__  指向 obj
const myObj = Object.create(obj, {
  like: {
    value: "fish", // 初始化赋值
    writable: true, // 是否是可改写的
    configurable: true, // 是否能够删除，是否能够被修改
    enumerable: true, //是否可以用for in 进行枚举
  },
  hate: {
    configurable: true,
    get: function () {
      console.log(111);
      return "mouse";
    },
    // get对象hate属性时触发的方法
    set: function (value) {
      // set对象hate属性时触发的方法
      console.log(value, 2222);
    },
  },
});

console.log(myObj.like);
console.log(myObj.hate);
