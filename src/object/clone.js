const isObj = (obj) => {
  return Object.prototype.toString.call(obj) === "[object Object]";
};

export const deepClone = (obj) => {
  let result = obj;
  // 判断是否为对象
  if (isObj(obj)) {
    result = Object.create(null);
    for (const key of Object.getOwnPropertySymbols(obj)) {
      result[key] = obj[key];
    }
    for (const key of Object.keys(obj)) {
      result[key] = deepClone(obj[key]);
    }
  } else if (Array.isArray(obj)) {
    result = [];
    for (const value of obj) {
      result.push(deepClone(value));
    }
  }
  return result;
};

const cc = deepClone({ name: 1123 });

console.log(cc);
