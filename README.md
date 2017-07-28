# DENQUE

[![Coverage Status](https://coveralls.io/repos/github/invertase/denque/badge.svg?branch=master)](https://coveralls.io/github/invertase/denque?branch=master)
[![build](https://travis-ci.org/invertase/denque.svg)](https://travis-ci.org/invertase/denque)
[![npm version](https://img.shields.io/npm/v/denque.svg)](https://www.npmjs.com/package/denque)
[![License](https://img.shields.io/npm/l/denque.svg)](/LICENSE)
[![Donate](https://img.shields.io/badge/Donate-Patreon-green.svg)](https://www.patreon.com/invertase)

Extremely fast and lightweight [double-ended queue](http://en.wikipedia.org/wiki/Double-ended_queue) implementation with zero dependencies.

Double-ended queues can also be used as a:

- [Stack](http://en.wikipedia.org/wiki/Stack_\(abstract_data_type\))
- [Queue](http://en.wikipedia.org/wiki/Queue_\(data_structure\))

This implementation is currently the fastest available, even faster than `double-ended-queue`, see the [benchmarks](#benchmarks)

Every queue operation is done at a constant `O(1)` - including random access from `.peekAt(index)`.

**Works on all node versions >= v0.10**

# Quick Start

    npm install denque

```js
const Denque = require("denque");

const denque = new Denque([1,2,3,4]);
denque.shift(); // 1
denque.pop(); // 4
```


# API

- [`new Denque()`](#new-denque---denque)
- [`new Denque(Array items)`](#new-denquearray-items---denque)
- [`push(item)`](#pushitem---int)
- [`unshift(item)`](#unshiftitem---int)
- [`pop()`](#pop---dynamic)
- [`shift()`](#shift---dynamic)
- [`toArray()`](#toarray---array)
- [`peekBack()`](#peekback---dynamic)
- [`peekFront()`](#peekfront---dynamic)
- [`peekAt(int index)`](#peekAtint-index---dynamic)
- [`remove(int index, int count)`](#remove)
- [`removeOne(int index)`](#removeOne)
- [`splice(int index, int count, item1, item2, ...)`](#splice)
- [`isEmpty()`](#isempty---boolean)
- [`clear()`](#clear---void)

#### `new Denque()` -> `Denque`

Creates an empty double-ended queue with initial capacity of 4.

```js
var denque = new Denque();
denque.push(1, 2, 3);
denque.shift(); //1
denque.pop(); //3
```

<hr>

#### `new Denque(Array items)` -> `Denque`

Creates a double-ended queue from `items`.

```js
var denque = new Denque([1,2,3,4]);
denque.shift(); // 1
denque.pop(); // 4
```

<hr>


#### `push(item)` -> `int`

Push an item to the back of this queue. Returns the amount of items currently in the queue after the operation.

```js
var denque = new Denque();
denque.push(1);
denque.pop(); // 1
denque.push(2);
denque.push(3);
denque.shift(); // 2
denque.shift(); // 3
```

<hr>

#### `unshift(item)` -> `int`

Unshift an item to the front of this queue. Returns the amount of items currently in the queue after the operation.

```js
var denque = new Denque([2,3]);
denque.unshift(1);
denque.toString(); // "1,2,3"
denque.unshift(-2);
denque.toString(); // "-2,-1,0,1,2,3"
```

<hr>


#### `pop()` -> `dynamic`

Pop off the item at the back of this queue.

Note: The item will be removed from the queue. If you simply want to see what's at the back of the queue use [`peekBack()`](#peekback---dynamic) or [`.peekAt(-1)`](#peekAtint-index---dynamic).

If the queue is empty, `undefined` is returned. If you need to differentiate between `undefined` values in the queue and `pop()` return value -
check the queue `.length` before popping.

```js
var denque = new Denque([1,2,3]);
denque.pop(); // 3
denque.pop(); // 2
denque.pop(); // 1
denque.pop(); // undefined
```

**Aliases:** `removeBack`

<hr>

#### `shift()` -> `dynamic`

Shifts off the item at the front of this queue.

Note: The item will be removed from the queue. If you simply want to see what's at the front of the queue use [`peekFront()`](#peekfront---dynamic) or [`.peekAt(0)`](#peekAtint-index---dynamic).

If the queue is empty, `undefined` is returned. If you need to differentiate between `undefined` values in the queue and `shift()` return value -
check the queue `.length` before shifting.

```js
var denque = new Denque([1,2,3]);
denque.shift(); // 1
denque.shift(); // 2
denque.shift(); // 3
denque.shift(); // undefined
```

<hr>

#### `toArray()` -> `Array`

Returns the items in the queue as an array. Starting from the item in the front of the queue and ending to the item at the back of the queue.

```js
var denque = new Denque([1,2,3]);
denque.push(4);
denque.unshift(0);
denque.toArray(); // [0,1,2,3,4]
```

<hr>

#### `peekBack()` -> `dynamic`

Returns the item that is at the back of this queue without removing it.

If the queue is empty, `undefined` is returned.

```js
var denque = new Denque([1,2,3]);
denque.push(4);
denque.peekBack(); // 4
```

<hr>

#### `peekFront()` -> `dynamic`

Returns the item that is at the front of this queue without removing it.

If the queue is empty, `undefined` is returned.

```js
var denque = new Denque([1,2,3]);
denque.push(4);
denque.peekFront(); // 1
```

<hr>

#### `peekAt(int index)` -> `dynamic`

Returns the item that is at the given `index` of this queue without removing it.

The index is zero-based, so `.peekAt(0)` will return the item that is at the front, `.peekAt(1)` will return
the item that comes after and so on.

The index can be negative to read items at the back of the queue. `.peekAt(-1)` returns the item that is at the back of the queue,
`.peekAt(-2)` will return the item that comes before and so on.

Returns `undefined` if `index` is not a valid index into the queue.

```js
var denque = new Denque([1,2,3]);
denque.peekAt(0); //1
denque.peekAt(1); //2
denque.peekAt(2); //3

denque.peekAt(-1); // 3
denque.peekAt(-2); // 2
denque.peekAt(-3); // 1
```

**Note**: The implementation has O(1) random access using `.peekAt()`.

**Aliases:** `get`

<hr>

#### `remove(int index, int count)` -> `array`

Remove number of items from the specified index from the list.

Returns array of removed items.

Returns undefined if the list is empty.

```js
var denque = new Denque([1,2,3,4,5,6,7]);
denque.remove(0,3); //[1,2,3]
denque.remove(1,2); //[5,6]
var denque1 = new Denque([1,2,3,4,5,6,7]);
denque1.remove(4, 100); //[5,6,7]
```
### 100000 items in queue performance

    denque.remove x 649,195 ops/sec ±1.33% (83 runs sampled)
    native array splice x 54,461 ops/sec ±164.33% (11 runs sampled)

<hr>

#### `removeOne(int index)` -> `dynamic`

Remove and return the item at the specified index from the list.

Returns undefined if the list is empty.

```js
var denque = new Denque([1,2,3,4,5,6,7]);
denque.removeOne(4); // 5
denque.removeOne(3); // 4
denque1.removeOne(1); // 2
```
### 100000 items in queue performance

    denque.removeOne x 487,168 ops/sec ±0.94% (85 runs sampled)
    native array splice x 39,082 ops/sec ±0.87% (88 runs sampled)

<hr>

#### `splice(int index, int count, item1, item2, ...)` -> `array`

Native splice implementation.

Remove number of items from the specified index from the list and/or add new elements.

Returns array of removed items or empty array if count == 0.

Returns undefined if the list is empty.

```js
var denque = new Denque([1,2,3,4,5,6,7]);
denque.splice(denque.length, 0, 8, 9, 10); // []
denque.toArray() // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
denque.splice(3, 3, 44, 55, 66); // [4,5,6]
denque.splice(5,4, 666,667,668,669); // [ 66, 7, 8, 9 ]
denque.toArray() // [ 1, 2, 3, 44, 55, 666, 667, 668, 669, 10 ]
```
### 100000 items in queue performance

    denque.splice x 178,198 ops/sec ±8.68% (61 runs sampled)
    native array splice x 3,639 ops/sec ±4.39% (65 runs sampled)

<hr>

#### `isEmpty()` -> `boolean`

Return `true` if this queue is empty, `false` otherwise.

```js
var denque = new Denque();
denque.isEmpty(); // true
denque.push(1);
denque.isEmpty(); // false
```

<hr>

#### `clear()` -> `void`

Remove all items from this queue. Does not change the queue's capacity.

```js
var denque = new Denque([1,2,3]);
denque.toString(); // "1,2,3"
denque.clear();
denque.toString(); // ""
```
<hr>


## Benchmarks

#### Platform info:
```
Darwin 16.5.0 x64
Node.JS 8.1.2
V8 5.8.283.41
Intel(R) Core(TM) i7-6820HQ CPU @ 2.70GHz × 8
```

#### 1000 items in queue (3x shift + 3x push ops per 'op')
 (3x shift + 3x push ops per 'op')

    denque x 26,076,776 ops/sec ±0.76% (90 runs sampled)
    double-ended-queue x 15,347,410 ops/sec ±2.02% (87 runs sampled)

#### 2 million items in queue

 (3x shift + 3x push ops per 'op')

    denque x 23,267,668 ops/sec ±0.77% (88 runs sampled)
    double-ended-queue x 14,990,494 ops/sec ±1.18% (88 runs sampled)

#### Splice

    denque.splice x 288,034 ops/sec ±111.88% (76 runs sampled)
    native array splice x 6,112 ops/sec ±6.80% (54 runs sampled)

#### Remove

    denque.remove x 1,433,848 ops/sec ±0.54% (89 runs sampled)
    native array splice x 17,843 ops/sec ±58.22% (10 runs sampled)

#### Remove One

    denque.removeOne x 973,777 ops/sec ±1.19% (84 runs sampled)
    native array splice x 70,916 ops/sec ±1.66% (84 runs sampled)
