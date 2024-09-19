export class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

export class LinkList {
  constructor() {
    /**
     * 头
     * @type {Node}
     */
    this.head = null;
    /**
     * 尾
     * @type {Node}
     */
    this.tail = null;
    /**
     * 长度
     * @type {number}
     */
    this.length = 0;
  }

  /**
   * 在链表尾部添加元素
   * @param {any} val
   * @returns {LinkList}
   */
  push(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  /**
   * 在链表尾部删除元素
   * @returns {Node}
   */
  pop() {
    if (!this.head) return null;
    let temp = this.head;
    let pre = this.head;
    while (temp.next) {
      pre = temp;
      temp = temp.next;
    }
    this.tail = pre;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return temp;
  }

  /**
   * 在链表头部删除元素
   * @returns {Node}
   */
  shift() {
    if (!this.head) return null;
    let temp = this.head;
    this.head = this.head.next;
    if (this.head === null) {
      this.tail = null;
    }
    this.length--;
    return temp;
  }

  /**
   * 在链表头部添加元素
   * @param {any} val
   */
  unshift(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }
  }
}
