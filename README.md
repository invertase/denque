# DENQUE

[![Coverage Status](https://coveralls.io/repos/github/Salakar/denque/badge.svg?branch=master)](https://coveralls.io/github/Salakar/denque?branch=master)
[![build](https://travis-ci.org/Salakar/denque.svg)](https://travis-ci.org/Salakar/denque)
[![npm version](https://img.shields.io/npm/v/denque.svg)](https://www.npmjs.com/package/denque)
[![License](https://img.shields.io/npm/l/denque.svg)](/LICENSE)

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
- [`isEmpty()`](#isempty---boolean)
- [`clear()`](#clear---void)

#####`new Denque()` -> `Denque`

Creates an empty double-ended queue with initial capacity of 4.

```js
var denque = new Denque();
denque.push(1, 2, 3);
denque.shift(); //1
denque.pop(); //3
```

<hr>

#####`new Denque(Array items)` -> `Denque`

Creates a double-ended queue from `items`.

```js
var denque = new Denque([1,2,3,4]);
denque.shift(); // 1
denque.pop(); // 4
```

<hr>


#####`push(item)` -> `int`

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

#####`unshift(item)` -> `int`

Unshift an item to the front of this queue. Returns the amount of items currently in the queue after the operation.

```js
var denque = new Denque([2,3]);
denque.unshift(1);
denque.toString(); // "1,2,3"
denque.unshift(-2);
denque.toString(); // "-2,-1,0,1,2,3"
```

<hr>


#####`pop()` -> `dynamic`

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

#####`shift()` -> `dynamic`

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

#####`toArray()` -> `Array`

Returns the items in the queue as an array. Starting from the item in the front of the queue and ending to the item at the back of the queue.

```js
var denque = new Denque([1,2,3]);
denque.push(4);
denque.unshift(0);
denque.toArray(); // [0,1,2,3,4]
```

<hr>

#####`peekBack()` -> `dynamic`

Returns the item that is at the back of this queue without removing it.

If the queue is empty, `undefined` is returned.

```js
var denque = new Denque([1,2,3]);
denque.push(4);
denque.peekBack(); // 4
```

<hr>

#####`peekFront()` -> `dynamic`

Returns the item that is at the front of this queue without removing it.

If the queue is empty, `undefined` is returned.

```js
var denque = new Denque([1,2,3]);
denque.push(4);
denque.peekFront(); // 1
```

<hr>

#####`peekAt(int index)` -> `dynamic`

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

#####`isEmpty()` -> `boolean`

Return `true` if this queue is empty, `false` otherwise.

```js
var denque = new Denque();
denque.isEmpty(); // true
denque.push(1);
denque.isEmpty(); // false
```

<hr>

#####`clear()` -> `void`

Remove all items from this queue. Does not change the queue's capacity.

```js
var denque = new Denque([1,2,3]);
denque.toString(); // "1,2,3"
denque.clear();
denque.toString(); // ""
```
<hr>


## Benchmarks

### 1000 items in queue

    denque x 31,015,027 ops/sec ±1.52% (86 runs sampled)
    double-ended-queue x 21,350,509 ops/sec ±1.21% (86 runs sampled)

### 2 million items in queue

    denque x 28,710,051 ops/sec ±0.95% (87 runs sampled)
    double-ended-queue x 20,531,490 ops/sec ±1.04% (89 runs sampled)
