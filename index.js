'use strict';

/**
 * Custom implementation of a double ended queue.
 */
module.exports = class Denque {
  constructor(array) {
    // circular buffer
    this._list = new Array(4);
    // bit mask
    this._capacityMask = 0x3;
    // next unread item
    this._head = 0;
    // next empty slot
    this._tail = 0;

    if (Array.isArray(array)) {
      this._fromArray(array);
    }
  }

  /**
   * -------------
   *  PUBLIC API
   * -------------
   */

  /**
   * Returns the item at the specified index from the list.
   * 0 is the first element, 1 is the second, and so on...
   * Elements at negative values are that many from the end: -1 is one before the end
   * (the last element), -2 is two before the end (one before last), etc.
   * @param index
   * @returns {*}
   */
  peekAt(index) {
    var i = index;
    // expect a number or return undefined
    if ((i !== (i | 0))) {
      return void 0;
    }
    const len = this.size();
    if (i >= len || i < -len) return undefined;
    if (i < 0) i += len;
    i = (this._head + i) & this._capacityMask;
    return this._list[i];
  }

  /**
   * Alias for peakAt()
   * @param i
   * @returns {*}
   */
  get(i) {
    return this.peekAt(i);
  }

  /**
   * Returns the first item in the list without removing it.
   * @returns {*}
   */
  peek() {
    if (this._head === this._tail) return undefined;
    return this._list[this._head];
  }

  /**
   * Alias for peek()
   * @returns {*}
   */
  peekFront() {
    return this.peek();
  }

  /**
   * Returns the item that is at the back of the queue without removing it.
   * Uses peekAt(-1)
   */
  peekBack() {
    return this.peekAt(-1);
  }

  /**
   * Returns the current length of the queue
   * @return {Number}
   */
  get length() {
    return this.size()
  }

  /**
   * Return the number of items on the list, or 0 if empty.
   * @returns {number}
   */
  size() {
    if (this._head === this._tail) return 0;
    if (this._head < this._tail) return this._tail - this._head;
    else return this._capacityMask + 1 - (this._head - this._tail);
  }

  /**
   * Add an item at the beginning of the list.
   * @param item
   */
  unshift(item) {
    if (item === undefined) return this.length;
    const len = this._list.length;
    this._head = (this._head - 1 + len) & this._capacityMask;
    this._list[this._head] = item;
    if (this._tail === this._head) this._growArray();
    if (this._head < this._tail) return this._tail - this._head;
    else return this._capacityMask + 1 - (this._head - this._tail);
  }

  /**
   * Remove and return the first item on the list,
   * Returns undefined if the list is empty.
   * @returns {*}
   */
  shift() {
    const head = this._head;
    if (head === this._tail) return undefined;
    const item = this._list[head];
    this._list[head] = undefined;
    this._head = (head + 1) & this._capacityMask;
    if (head < 2 && this._tail > 10000 && this._tail <= this._list.length >>> 2) this._shrinkArray();
    return item;
  }

  /**
   * Add an item to the bottom of the list.
   * @param item
   */
  push(item) {
    if (item === undefined) return this.length;
    const tail = this._tail;
    this._list[tail] = item;
    this._tail = (tail + 1) & this._capacityMask;
    if (this._tail === this._head) {
      this._growArray();
    }

    if (this._head < this._tail) return this._tail - this._head;
    else return this._capacityMask + 1 - (this._head - this._tail);
  }

  /**
   * Remove and return the last item on the list.
   * Returns undefined if the list is empty.
   * @returns {*}
   */
  pop() {
    const tail = this._tail;
    if (tail === this._head) return undefined;
    const len = this._list.length;
    this._tail = (tail - 1 + len) & this._capacityMask;
    const item = this._list[this._tail];
    this._list[this._tail] = undefined;
    if (this._head < 2 && tail > 10000 && tail <= len >>> 2) this._shrinkArray();
    return item;
  }

  /**
   * Soft clear - does not reset capacity.
   */
  clear() {
    this._head = 0;
    this._tail = 0;
  }

  /**
   * Returns true or false whether the list is empty.
   * @returns {boolean}
   */
  isEmpty() {
    return this._head === this._tail;
  }

  /**
   * Returns an array of all queue items.
   * @returns {Array}
   */
  toArray() {
    return this._copyArray(false);
  }

  /**
   * -------------
   *   INTERNALS
   * -------------
   */

  /**
   * Fills the queue with items from an array
   * For use in the constructor
   * @param array
   * @private
   */
  _fromArray(array) {
    for (var i = 0; i < array.length; i++) this.push(array[i]);
  }

  /**
   *
   * @param fullCopy
   * @returns {Array}
   * @private
   */
  _copyArray(fullCopy) {
    const newArray = [];
    const list = this._list;
    const len = list.length;
    var i;
    if (fullCopy || this._head > this._tail) {
      for (i = this._head; i < len; i++) newArray.push(list[i]);
      for (i = 0; i < this._tail; i++) newArray.push(list[i]);
    } else {
      for (i = this._head; i < this._tail; i++) newArray.push(list[i]);
    }
    return newArray;
  }

  /**
   * Grows the internal list array.
   * @private
   */
  _growArray() {
    if (this._head) {
      // copy existing data, head to end, then beginning to tail.
      this._list = this._copyArray(true);
      this._head = 0;
    }

    // head is at 0 and array is now full, safe to extend
    this._tail = this._list.length;

    this._list.length *= 2;
    this._capacityMask = (this._capacityMask << 1) | 1;
  }

  /**
   * Shrinks the internal list array.
   * @private
   */
  _shrinkArray() {
    this._list.length >>>= 1;
    this._capacityMask >>>= 1;
  }
};
