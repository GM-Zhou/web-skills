import { deepClone } from './clone';

describe('deepClone', () => {
  describe('基本类型测试', () => {
    test('should clone primitive values', () => {
      expect(deepClone(undefined)).toBe(undefined);
      expect(deepClone(null)).toBe(null);
      expect(deepClone(123)).toBe(123);
      expect(deepClone('hello')).toBe('hello');
      expect(deepClone(true)).toBe(true);
      expect(deepClone(false)).toBe(false);
      expect(deepClone(NaN)).toBeNaN();
      expect(deepClone(Infinity)).toBe(Infinity);
      expect(deepClone(-Infinity)).toBe(-Infinity);
    });

    test('should clone Symbol', () => {
      const sym = Symbol('test');
      expect(deepClone(sym)).toBe(sym);
    });
  });

  describe('内置对象测试', () => {
    test('should clone Date', () => {
      const date = new Date('2024-03-14');
      const cloned = deepClone(date);
      expect(cloned).toEqual(date);
      expect(cloned).not.toBe(date);
    });

    test('should clone RegExp', () => {
      const regexp = new RegExp('test', 'gi');
      const cloned = deepClone(regexp);
      expect(cloned.source).toBe(regexp.source);
      expect(cloned.flags).toBe(regexp.flags);
    });

    test('should clone Error', () => {
      const error = new Error('test error');
      const cloned = deepClone(error);
      expect(cloned.message).toBe(error.message);
    });

    test('should clone Map', () => {
      const key = { id: 1 };
      const map = new Map([[key, 'value']]);
      const cloned = deepClone(map);
      expect(cloned.get([...cloned.keys()][0])).toBe('value');
    });

    test('should clone Set', () => {
      const obj = { id: 1 };
      const set = new Set([1, obj]);
      const cloned = deepClone(set);
      expect([...cloned][1]).toEqual(obj);
      expect([...cloned][1]).not.toBe(obj);
    });
  });

  describe('对象属性测试', () => {
    test('should clone getter/setter', () => {
      const obj = {
        get name() { return 'test'; },
        set name(value) { this._name = value; }
      };
      const cloned = deepClone(obj);
      const descriptor = Object.getOwnPropertyDescriptor(cloned, 'name');
      expect(typeof descriptor.get).toBe('function');
      expect(typeof descriptor.set).toBe('function');
    });

    test('should clone non-enumerable properties', () => {
      const obj = {};
      Object.defineProperty(obj, 'hidden', {
        enumerable: false,
        value: 'secret'
      });
      const cloned = deepClone(obj);
      expect(Object.getOwnPropertyDescriptor(cloned, 'hidden')).toBeDefined();
    });
  });

  describe('特殊场景测试', () => {
    test('should handle nested circular references', () => {
      const obj1 = { name: 'obj1' };
      const obj2 = { name: 'obj2' };
      obj1.ref = obj2;
      obj2.ref = obj1;
      const cloned = deepClone(obj1);
      expect(cloned.ref.ref).toBe(cloned);
    });

    test('should handle prototype chain', () => {
      class Parent { parentMethod() {} }
      class Child extends Parent { childMethod() {} }
      const instance = new Child();
      const cloned = deepClone(instance);
      expect(cloned instanceof Child).toBe(true);
      expect(cloned instanceof Parent).toBe(true);
    });

    test('should handle complex nested structure', () => {
      const complex = {
        date: new Date(),
        regexp: /test/i,
        map: new Map([[{ key: 1 }, { value: 2 }]]),
        set: new Set([{ id: 1 }]),
        symbol: Symbol('test'),
        error: new Error('test'),
        nested: {
          array: [1, { deep: true }],
          buffer: Buffer.from('test')
        }
      };
      complex.self = complex;

      const cloned = deepClone(complex);
      expect(cloned.self).toBe(cloned);
      expect(cloned.nested.array[1]).toEqual({ deep: true });
      expect(cloned.map.size).toBe(1);
    });
  });
});