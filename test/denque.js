'use strict';

var assert = require('assert');
var Denque = require('../');

describe('Denque.prototype.constructor', function () {
  it("should take no argument", function () {
    var a = new Denque();
    assert(a._capacityMask === 3);
    assert(a._list.length === 4);
    assert(a.size() === 0);
    assert(a.length === 0);
  });

  it("should take array argument", function () {
    var a = new Denque([1, 2, 3, 4]);
    var b = new Denque([]);

    assert(a.length >= 4);
    assert.deepEqual(a.toArray(), [1, 2, 3, 4]);
    assert(b.length === 0);
    assert.deepEqual(b.toArray(), []);
  });

  it("should handle a high volume with no out of memory exception", function () {
    this.timeout(20000);
    var denque = new Denque();
    var l = 250000;

    while (--l) {
      denque.push(l);
      denque.unshift(l);
    }

    l = 125000;
    while (--l) {
      var a = denque.shift();
      denque.pop();
      denque.shift();
      denque.push(a);
      denque.shift();
      denque.shift();
    }

    // console.log(denque._list.length);
    // console.log(denque.length);
    // console.log(denque._head);
    // console.log(denque._tail);

    denque.clear();
    l = 100000;

    while (--l) {
      denque.push(l);
    }

    l = 100000;
    while (--l) {
      denque.shift();
      denque.shift();
      denque.shift();
      if (l === 25000) denque.clear();
      denque.pop();
      denque.pop();
      denque.pop();
    }

    // console.log(denque._list.length);
    // console.log(denque.length);
    // console.log(denque._head);
    // console.log(denque._tail);

  });
});

describe('Denque.prototype.toArray', function () {
  it("should return an array", function () {
    var a = new Denque([1, 2, 3, 4]);
    assert.deepEqual(a.toArray(), [1, 2, 3, 4]);
  });
});

describe('Denque.prototype.push', function () {
  it("Should do nothing if no arguments", function () {
    var a = new Denque();
    var before = a.length;
    var ret = a.push();
    assert(ret === before);
    assert(a.length === ret);
    assert(ret === 0);
  });

  it("Should add falsey elements (except undefined)", function () {
    var a = new Denque();
    // var before = a.length;
    var ret = a.push(0);
    assert.strictEqual(ret, 1);
    assert.strictEqual(a.length, 1);
    assert.strictEqual(a.get(0), 0);
    ret = a.push('');
    assert.strictEqual(ret, 2);
    assert.strictEqual(a.length, 2);
    assert.strictEqual(a.get(1), '');
    ret = a.push(null);
    assert.strictEqual(ret, 3);
    assert.strictEqual(a.length, 3);
    assert.strictEqual(a.get(2), null);
  });

  it("Should add single argument - plenty of capacity", function () {
    var a = new Denque([1, 2, 3, 4, 5]);
    assert(a._list.length - a.length > 1);
    var before = a.length;
    var ret = a.push(1);
    assert(ret === before + 1);
    assert(a.length === ret);
    assert(ret === 6);
    assert.deepEqual(a.toArray(), [1, 2, 3, 4, 5, 1]);
  });

  it("Should add single argument - exact capacity", function () {
    var a = new Denque([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    assert(a._list.length - a.length === 1);
    var before = a.length;
    var ret = a.push(1);
    assert(ret === before + 1);
    assert(a.length === ret);
    assert(ret === 16);
    assert.deepEqual(a.toArray(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1]);
  });

  it("Should add single argument - over capacity", function () {
    var a = new Denque([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    assert(a._list.length / a.length === 2);
    var before = a.length;
    var ret = a.push(1);
    assert(ret === before + 1);
    assert(a.length === ret);
    assert(ret === 17);
    assert.deepEqual(a.toArray(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1]);
  });

});

describe('Denque.prototype.unshift', function () {

  it("Should do nothing if no arguments", function () {
    var a = new Denque();
    var before = a.length;
    var ret = a.unshift();
    assert(ret === before);
    assert(a.length === ret);
    assert(ret === 0);
  });

  it("Should unshift falsey elements (except undefined)", function () {
    var a = new Denque();
    // var before = a.length;
    var ret = a.unshift(0);
    assert.strictEqual(ret, 1);
    assert.strictEqual(a.length, 1);
    assert.strictEqual(a.get(0), 0);
    ret = a.unshift('');
    assert.strictEqual(ret, 2);
    assert.strictEqual(a.length, 2);
    assert.strictEqual(a.get(0), '');
    ret = a.unshift(null);
    assert.strictEqual(ret, 3);
    assert.strictEqual(a.length, 3);
    assert.strictEqual(a.get(0), null);
  });

  it("Should add single argument - plenty of capacity", function () {
    var a = new Denque([1, 2, 3, 4, 5]);
    assert(a._list.length - a.length > 1);
    var before = a.length;
    var ret = a.unshift(1);
    assert(ret === before + 1);
    assert(a.length === ret);
    assert(ret === 6);
    assert.deepEqual(a.toArray(), [1, 1, 2, 3, 4, 5]);
  });

  it("Should add single argument - exact capacity", function () {
    var a = new Denque([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    assert(a._list.length - a.length === 1);
    var before = a.length;
    var ret = a.unshift(1);
    assert(ret === before + 1);
    assert(a.length === ret);
    assert(ret === 16);
    assert.deepEqual(a.toArray(), [1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  });

  it("Should add single argument - over capacity", function () {
    var a = new Denque([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    assert(a._list.length / a.length === 2);
    var before = a.length;
    var ret = a.unshift(1);
    assert(ret === before + 1);
    assert(a.length === ret);
    assert(ret === 17);
    assert.deepEqual(a.toArray(), [1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
  });

});

describe('Denque.prototype.pop', function () {
  it("Should return undefined when empty denque", function () {
    var a = new Denque();
    assert(a.length === 0);
    assert(a.pop() === void 0);
    assert(a.pop() === void 0);
    assert(a.length === 0);
  });

  it("Should return the item at the back of the denque", function () {
    var a = new Denque([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    var b = [];

    b.push(1, 2, 3, 4, 5, 6, 7, 8, 9);

    assert(a.pop() === 9);
    assert(a.pop() === 8);
    b.pop();
    b.pop();
    assert.deepEqual(a.toArray(), b);
    a.unshift(5);
    a.unshift(4);
    a.unshift(3);
    a.unshift(2);
    a.unshift(1);
    a.push(1);
    a.push(2);
    a.push(3);
    a.push(4);
    a.push(5);
    a.unshift(3);
    a.unshift(2);
    a.unshift(1);
    a.pop();
    b.unshift(1, 2, 3, 4, 5);
    b.push(1, 2, 3, 4, 5);
    b.unshift(1, 2, 3);
    b.pop();
    assert.deepEqual(a.toArray(), b);
    assert(a.pop() === b.pop());
    assert.deepEqual(a.toArray(), b);
  });
});

describe('Deque.prototype.shift', function () {
  it("Should return undefined when empty denque", function () {
    var a = new Denque();
    assert(a.length === 0);
    assert(a.shift() === void 0);
    assert(a.shift() === void 0);
    assert(a.length === 0);
  });

  it("Should return the item at the front of the denque", function () {
    var a = new Denque([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    var b = [];

    b.push(1, 2, 3, 4, 5, 6, 7, 8, 9);

    assert(a.shift() === 1);
    assert(a.shift() === 2);
    b.shift();
    b.shift();
    assert.deepEqual(a.toArray(), b);
    a.unshift(5);
    a.unshift(4);
    a.unshift(3);
    a.unshift(2);
    a.unshift(1);
    a.push(1);
    a.push(2);
    a.push(3);
    a.push(4);
    a.push(5);
    a.unshift(3);
    a.unshift(2);
    a.unshift(1);
    a.shift();
    b.unshift(1, 2, 3, 4, 5);
    b.push(1, 2, 3, 4, 5);
    b.unshift(1, 2, 3);
    b.shift();
    assert.deepEqual(a.toArray(), b);
    assert(a.shift() === b.shift());
    assert.deepEqual(a.toArray(), b);
  });
});

describe('Denque.prototype.get', function () {
  it("should return undefined on nonsensical argument", function () {
    var a = new Denque([1, 2, 3, 4]);
    assert(a.get(-5) === void 0);
    assert(a.get(-100) === void 0);
    assert(a.get(void 0) === void 0);
    assert(a.get("1") === void 0);
    assert(a.get(NaN) === void 0);
    assert(a.get(Infinity) === void 0);
    assert(a.get(-Infinity) === void 0);
    assert(a.get(1.5) === void 0);
    assert(a.get(4) === void 0);
  });

  it("should support positive indexing", function () {
    var a = new Denque([1, 2, 3, 4]);
    assert(a.get(0) === 1);
    assert(a.get(1) === 2);
    assert(a.get(2) === 3);
    assert(a.get(3) === 4);
  });

  it("should support negative indexing", function () {
    var a = new Denque([1, 2, 3, 4]);
    assert(a.get(-1) === 4);
    assert(a.get(-2) === 3);
    assert(a.get(-3) === 2);
    assert(a.get(-4) === 1);
  });
});

describe('Denque.prototype.isEmpty', function () {
  it("should return true on empty denque", function () {
    var a = new Denque();
    assert(a.isEmpty());
  });

  it("should return false on denque with items", function () {
    var a = new Denque([1]);
    assert(!a.isEmpty());
  });
});

describe('Denque.prototype.peekFront', function () {
  it("Should return undefined when queue is empty", function () {
    var a = new Denque();
    assert(a.length === 0);
    assert(a.peekFront() === void 0);
    assert(a.peekFront() === void 0);
    assert(a.length === 0);
  });

  it("should return the item at the front of the denque", function () {
    var a = new Denque([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    assert(a.peekFront() === 1);

    var l = 5;
    while (l--) a.pop();

    assert.deepEqual(a.toArray(), [1, 2, 3, 4]);

    assert(a.peekFront() === 1);
  });
});

describe('Denque.prototype.peekBack', function () {
  it("Should return undefined when queue is empty", function () {
    var a = new Denque();
    assert(a.length === 0);
    assert(a.peekBack() === void 0);
    assert(a.peekBack() === void 0);
    assert(a.length === 0);
  });

  it("should return the item at the back of the denque", function () {
    var a = new Denque([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    assert(a.peekBack() === 9);

    var l = 5;
    while (l--) a.pop();

    assert.deepEqual(a.toArray(), [1, 2, 3, 4]);

    assert(a.peekBack() === 4);
  });
});


describe('Denque.prototype.clear', function () {
  it("should clear the denque", function () {
    var a = new Denque([1, 2, 3, 4]);
    assert(!a.isEmpty());
    a.clear();
    assert(a.isEmpty());
  });
});


describe('Denque.prototype.removeOne', function () {
  it("Should return undefined when empty denque", function () {
    var a = new Denque();
    assert(a.length === 0);
    assert(a.removeOne(1) === void 0);
    assert(a.length === 0);
  });

  it("Should return undefined when index is invalid", function () {
    var a = new Denque();
    var b = new Denque();
    b.push('foobar');
    b.push('foobaz');
    assert(a.length === 0);
    assert(a.removeOne('foobar') === void 0);
    assert(b.removeOne(-1, 2) === 'foobaz');
    assert(b.removeOne(-4, 0) === void 0);
    assert(b.removeOne(3, 2) === void 0);
    assert(a.removeOne({}) === void 0);
    assert(a.length === 0);
  });

});

describe('Denque.prototype.remove', function () {
  it("Should return undefined when empty denque", function () {
    var a = new Denque();
    assert(a.length === 0);
    assert(a.remove(1) === void 0);
    assert(a.remove(2, 3) === void 0);
    assert(a.length === 0);
  });

  it("Should return undefined if index or count invalid", function () {
    var a = new Denque();
    var b = new Denque();
    b.push('foobar');
    b.push('foobaz');
    assert(a.length === 0);
    assert(a.remove('foobar') === void 0);
    assert(b.remove(-1, 0) === void 0);
    assert(b.remove(-1, 2).length === 1);
    assert(b.remove(-5, 1) === void 0);
    assert(b.remove(66, 0) === void 0);
    assert(a.remove({}) === void 0);
    assert(a.length === 0);
  });

  it("Should return the item at the front of the denque", function () {
    var a = new Denque([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    var b = [];
    b.push(1, 2, 3, 4, 5, 6, 7, 8, 9);

    assert.deepEqual(a.remove(0, 1), b.splice(0, 1));
    assert.deepEqual(a.remove(0, 1), b.splice(0, 1));
    assert.deepEqual(a.toArray(), b);
    a.unshift(5);
    a.unshift(4);
    a.unshift(3);
    a.unshift(2);
    a.unshift(1);
    a.push(1);
    a.push(2);
    a.push(3);
    a.push(4);
    a.push(5);
    a.unshift(3);
    a.unshift(2);
    a.unshift(1);
    a.remove(0, 1);
    b.unshift(1, 2, 3, 4, 5);
    b.push(1, 2, 3, 4, 5);
    b.unshift(1, 2, 3);
    b.splice(0, 1);
    assert.deepEqual(a.toArray(), b);
    assert.deepEqual(a.remove(0, 1), b.splice(0, 1));
    assert.deepEqual(a.toArray(), b);
  });

  it("Should return the item at the back of the denque", function () {
    var a = new Denque([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    var b = [];

    b.push(1, 2, 3, 4, 5, 6, 7, 8, 9);
    assert.deepEqual(a.remove(8, 1), b.splice(8, 1));
    assert.deepEqual(a.toArray(), b);
    a.unshift(5);
    a.unshift(4);
    a.unshift(3);
    a.unshift(2);
    a.unshift(1);
    a.push(1);
    a.push(2);
    a.push(3);
    a.push(4);
    a.push(5);
    a.unshift(3);
    a.unshift(2);
    a.unshift(1);
    a.remove(20, 1);
    b.unshift(1, 2, 3, 4, 5);
    b.push(1, 2, 3, 4, 5);
    b.unshift(1, 2, 3);
    b.splice(20, 1);
    assert.deepEqual(a.toArray(), b);
    assert.deepEqual(a.remove(19, 1), b.splice(19, 1));
    assert.deepEqual(a.toArray(), b);
  });

  it("Should return the item somewhere in the middle of the denque", function () {
    var a = new Denque([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    var b = [];
    b.push(1, 2, 3, 4, 5, 6, 7, 8, 9);

    assert(a.remove(4, 1), b.splice(4, 1));
    assert(a.remove(5, 1), b.splice(5, 1));
    assert(a.remove(3, 1), b.splice(3, 1));
    assert.deepEqual(a.toArray(), b);
    a.unshift(5);
    a.unshift(4);
    a.unshift(3);
    a.unshift(2);
    a.unshift(1);
    a.push(1);
    a.push(2);
    a.push(3);
    a.push(4);
    a.push(5);
    a.unshift(3);
    a.unshift(2);
    a.unshift(1);
    a.remove(7, 1);
    b.unshift(1, 2, 3, 4, 5);
    b.push(1, 2, 3, 4, 5);
    b.unshift(1, 2, 3);
    b.splice(7, 1);

    assert.deepEqual(a.toArray(), b);
    assert.deepEqual(a.remove(1, 4), b.splice(1, 4));
    assert.deepEqual(a.toArray(), b);
  });

  it("Should remove a number of items at the front of the denque", function () {
    var a = new Denque([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    var b = [];
    b.push(1, 2, 3, 4, 5, 6, 7, 8, 9);

    assert.deepEqual(a.remove(0, 5), b.splice(0, 5));
    assert.deepEqual(a.toArray(), b);
    a.unshift(5);
    a.unshift(4);
    a.unshift(3);
    a.unshift(2);
    a.unshift(1);
    a.push(1);
    a.push(2);
    a.push(3);
    a.push(4);
    a.push(5);
    a.unshift(3);
    a.unshift(2);
    a.unshift(1);
    a.remove(0, 11);
    b.unshift(1, 2, 3, 4, 5);
    b.push(1, 2, 3, 4, 5);
    b.unshift(1, 2, 3);
    b.splice(0, 11);

    assert.deepEqual(a.toArray(), b);
    assert.deepEqual(a.remove(0, 1), b.splice(0, 1));
    assert.deepEqual(a.toArray(), b);
  });

  it("Should remove a number of items at the back of the denque", function () {
    var a = new Denque([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    var b = [];
    b.push(1, 2, 3, 4, 5, 6, 7, 8, 9);

    assert.deepEqual(a.remove(5, 4), b.splice(5, 4));
    assert.deepEqual(a.toArray(), b);
    a.unshift(5);
    a.unshift(4);
    a.unshift(3);
    a.unshift(2);
    a.unshift(1);
    a.push(1);
    a.push(2);
    a.push(3);
    a.push(4);
    a.push(5);
    a.unshift(3);
    a.unshift(2);
    a.unshift(1);
    a.remove(16, 3);
    b.unshift(1, 2, 3, 4, 5);
    b.push(1, 2, 3, 4, 5);
    b.unshift(1, 2, 3);
    b.splice(16, 3);

    assert.deepEqual(a.toArray(), b);
    assert.deepEqual(a.remove(5, 100), b.splice(5, 100));
    assert.deepEqual(a.toArray(), b);
  });

  it("Should remove a number of items somewhere in the middle of the denque", function () {
    var a = new Denque([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    var b = [];
    b.push(1, 2, 3, 4, 5, 6, 7, 8, 9);

    assert.deepEqual(a.remove(3, 3), b.splice(3, 3));
    assert.deepEqual(a.toArray(), b);
    a.unshift(5);
    a.unshift(4);
    a.unshift(3);
    a.unshift(2);
    a.unshift(1);
    a.push(1);
    a.push(2);
    a.push(3);
    a.push(4);
    a.push(5);
    a.unshift(3);
    a.unshift(2);
    a.unshift(1);
    // console.log(a.toArray())
    a.remove(8, 6);
    b.unshift(1, 2, 3, 4, 5);
    b.push(1, 2, 3, 4, 5);
    b.unshift(1, 2, 3);
    b.splice(8, 6);

    assert.deepEqual(a.toArray(), b);
    assert.deepEqual(a.remove(3, 3), b.splice(3, 3));
    assert.deepEqual(a.toArray(), b);
  });

  it("Should clear denque", function () {
    var a = new Denque([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    var b = [];

    b.push(1, 2, 3, 4, 5, 6, 7, 8, 9);
    a.remove(0, 9);
    b.splice(0, 9);
    assert.deepEqual(a.toArray(), b)
  });
});

describe('Denque.prototype.splice', function () {
  it("Should remove and add items like native splice method at the front of denque", function () {
    var a = new Denque([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    var b = [];
    b.push(1, 2, 3, 4, 5, 6, 7, 8, 9);

    assert.deepEqual(a.splice(0, 2, 14, 15, 16), [1, 2]); // remove then add
    a.splice(0, 0, [11, 12, 13]); // add

    b.splice(0, 2, 14, 15, 16);
    b.splice(0, 0, [11, 12, 13]);
    assert.deepEqual(a.toArray(), b);
    a.unshift(5);
    a.unshift(4);
    a.unshift(3);
    a.unshift(2);
    a.unshift(1);
    a.push(1);
    a.push(2);
    a.push(3);
    a.push(4);
    a.push(5);
    a.unshift(3);
    a.unshift(2);
    a.unshift(1);
    a.splice(0, 0, 17, 18, 19);
    b.unshift(1, 2, 3, 4, 5);
    b.push(1, 2, 3, 4, 5);
    b.unshift(1, 2, 3);
    b.splice(0, 0, 17, 18, 19);
    assert.deepEqual(a.toArray(), b);
    assert.deepEqual(a.splice(0, 2), b.splice(0, 2)); //remove
    assert.deepEqual(a.toArray(), b);
  });

  it("Should remove and add items like native splice method at the end of denque", function () {
    var a = new Denque([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    var b = [];
    b.push(1, 2, 3, 4, 5, 6, 7, 8, 9);

    assert.deepEqual(a.splice(a.length - 1, 1, 14, 15, 16), [9]); // remove then add
    a.splice(a.length, 0, [11, 12, 13]); // add

    b.splice(b.length - 1, 1, 14, 15, 16);
    b.splice(b.length, 0, [11, 12, 13]);
    assert.deepEqual(a.toArray(), b);
    a.unshift(5);
    a.unshift(4);
    a.unshift(3);
    a.unshift(2);
    a.unshift(1);
    a.push(1);
    a.push(2);
    a.push(3);
    a.push(4);
    a.push(5);
    a.unshift(3);
    a.unshift(2);
    a.unshift(1);
    a.splice(a.length, 0, 17, 18, 19);
    b.unshift(1, 2, 3, 4, 5);
    b.push(1, 2, 3, 4, 5);
    b.unshift(1, 2, 3);
    b.splice(b.length, 0, 17, 18, 19);
    assert.deepEqual(a.toArray(), b);
    a.splice(18, 0, 18, 19);
    b.splice(18, 0, 18, 19);
    assert.deepEqual(a.toArray(), b);
    a.splice(21, 0, 1, 2, 3, 4, 5, 6);
    b.splice(21, 0, 1, 2, 3, 4, 5, 6);
    assert.deepEqual(a.toArray(), b);
    assert.deepEqual(a.splice(a.length-1,2), b.splice(b.length-1,2)); //remove
    assert.deepEqual(a.toArray(), b);
  });

  it("Should remove and add items like native splice method somewhere in the middle of denque", function () {
    var a = new Denque([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    var b = [];
    b.push(1, 2, 3, 4, 5, 6, 7, 8, 9);

    a.splice(2, 0, [11, 12, 13]);
    assert.deepEqual(a.splice(7, 2, 14, 15, 16), [7, 8]); // remove then add
    assert.deepEqual(a.splice(10, 1, 17, 18), [9]);

    b.splice(2, 0, [11, 12, 13]);
    b.splice(7, 2, 14, 15, 16);
    b.splice(10, 1, 17, 18);
    assert.deepEqual(a.toArray(), b);
    a.unshift(5);
    a.unshift(4);
    a.unshift(3);
    a.unshift(2);
    a.unshift(1);
    a.push(1);
    a.push(2);
    a.push(3);
    a.push(4);
    a.push(5);
    a.unshift(3);
    a.unshift(2);
    a.unshift(1);
    b.unshift(1, 2, 3, 4, 5);
    b.push(1, 2, 3, 4, 5);
    b.unshift(1, 2, 3);

    assert.deepEqual(a.splice(3, 3, 16, 15, 14), b.splice(3, 3, 16, 15, 14));
    assert.deepEqual(a.toArray(), b);
    assert.deepEqual(a.splice(6, 1), b.splice(6, 1));
    assert.deepEqual(a.toArray(), b);
  });

  it("Should return undefined when index or count is invalid", function () {
    var a = new Denque();
    var b = new Denque();
    b.push('foobar');
    b.push('foobaz');
    assert(a.length === 0);
    assert(a.splice('foobar') === void 0);
    assert(b.splice(-1, 0) === void 0);
    assert(b.splice(-5, 1) === void 0);
    assert(b.splice(66, 0) === void 0);
    assert(a.splice({}) === void 0);
    assert(a.length === 0);
  });

  it("Should return undefined when the queue is empty", function () {
    var a = new Denque();
    assert(a.length === 0);
    assert(a.splice(1, 0) === void 0);
  });

  it("Should return undefined when trying to remove further than current size", function () {
    var a = new Denque();
    a.push('foobar');
    a.push('foobar1');
    a.push('foobar2');
    a.push('foobar3');
    assert(a.length === 4);
    assert(a.splice(4, 234) === void 0);
  });
});
