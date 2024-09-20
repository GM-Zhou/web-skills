/**
 * 队列
 */
export class Queue {
  constructor() {
    this.items = [];
  }

  /**
   * 入队
   * @param {*} item
   */
  enqueue(item) {
    this.items.push(item);
  }

  /**
   * 出队
   */
  dequeue() {
    return this.items.shift();
  }

  /**
   * 队列是否为空
   */
  isEmpty() {
    return this.items.length === 0;
  }

  /**
   * 队列长度
   */
  size() {
    return this.items.length;
  }

  /**
   * 清空队列
   */
  clear() {
    this.items = [];
  }

  /**
   * 遍历队列
   * @param {*} callback
   */
  traverse(callback) {
    this.items.forEach(callback);
  }
}
