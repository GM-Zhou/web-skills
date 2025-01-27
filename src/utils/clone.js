export const deepClone = (obj, hash = new WeakMap()) => {
  // 处理循环引用
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // 处理基本类型
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 处理特殊对象类型
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Map) {
    const result = new Map();
    hash.set(obj, result);
    obj.forEach((value, key) => {
      result.set(deepClone(key, hash), deepClone(value, hash));
    });
    return result;
  }
  if (obj instanceof Set) {
    const result = new Set();
    hash.set(obj, result);
    obj.forEach(value => {
      result.add(deepClone(value, hash));
    });
    return result;
  }
  if (obj instanceof Error) {
    const result = new obj.constructor(obj.message);
    hash.set(obj, result);
    return result;
  }

  // 处理数组
  if (Array.isArray(obj)) {
    const result = [];
    hash.set(obj, result);
    obj.forEach((value, index) => {
      result[index] = deepClone(value, hash);
    });
    return result;
  }

  // 创建同原型的对象
  const result = Object.create(Object.getPrototypeOf(obj));
  hash.set(obj, result);

  // 获取所有属性描述符
  const propNames = Object.getOwnPropertyNames(obj);
  const symbols = Object.getOwnPropertySymbols(obj);

  // 复制所有属性（包括不可枚举属性）
  [...propNames, ...symbols].forEach(key => {
    const descriptor = Object.getOwnPropertyDescriptor(obj, key);
    
    // 处理 getter/setter
    if (descriptor.get || descriptor.set) {
      Object.defineProperty(result, key, descriptor);
    } else {
      // 处理普通属性
      Object.defineProperty(result, key, {
        ...descriptor,
        value: deepClone(descriptor.value, hash)
      });
    }
  });

  return result;
};