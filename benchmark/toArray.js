'use strict';
require('./print');

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

var Denque = require('./../');
var DoubleEndedQueue = require('double-ended-queue');

var denque = new Denque();
var denque_NonContiguous = new Denque();
var denque_NonZeroHead = new Denque();

var doubleEndedQueue = new DoubleEndedQueue();
var doubleEndedQueue_NonContiguous = new DoubleEndedQueue();
var doubleEndedQueue_NonZeroHead = new DoubleEndedQueue();

var array = new Array();


// Number of elements has to be 1 less than a power of 2 in order to ensure that the buffer 
// wrapping occurs on the _NonContiguous variant and not the base variant
var l = (1 << 21) - 1;
var l_half = (l / 2) >> 0;


for (var i = 0; i < l; i++) {
  denque.push(i);
  denque_NonContiguous.push(i);
  denque_NonZeroHead.push(i);

  doubleEndedQueue.push(i);
  doubleEndedQueue_NonContiguous.push(i);
  doubleEndedQueue_NonZeroHead.push(i);

  array.push(i)
}

for (var i = 0; i < l_half; i++) {
  denque_NonZeroHead.push(i);
  doubleEndedQueue_NonZeroHead.push(i);
}

// Shift half and push half. This should make the internal buffer non contiguous and about half 
// before and half after the wrap
for (var i = 0; i < l_half; i++) {
  denque_NonContiguous.shift();
  denque_NonContiguous.push(i);

  doubleEndedQueue_NonContiguous.shift();
  doubleEndedQueue_NonContiguous.push(i);

  denque_NonZeroHead.shift();
  doubleEndedQueue_NonZeroHead.shift();
}

// Make sure that the denqueue buffer is contiguous or not
console.assert(denque._head < denque._tail, "Denque (contiguous) buffer is not contiguous");
console.assert(
  denque_NonZeroHead._head < denque_NonZeroHead._tail,
  "Denque (non zero head) buffer is not contiguous"
);
console.assert(
  denque_NonContiguous._head > denque_NonContiguous._tail,
  "Denque (non-contiguous) buffer is contiguous"
);

// Make sure that the same number of elements is used in each queue, despite shifts
console.assert(denque.length == denque_NonContiguous.length, "Denque variant length missmatch");
console.assert(denque.length == denque_NonZeroHead.length, "Denque variant length missmatch");
console.assert(denque.length == doubleEndedQueue.length, "Denque vs double-ended-queue length missmatch");
console.assert(doubleEndedQueue.length == doubleEndedQueue_NonContiguous.length, "Denque variant length missmatch");
console.assert(doubleEndedQueue.length == doubleEndedQueue_NonZeroHead.length, "Denque variant length missmatch");


suite
  .add('denque (head at 0)', function () {
    var arr = denque.toArray();
  })
  .add('double-ended-queue (head at 0)', function () {
    var arr = doubleEndedQueue.toArray();
  })
  .add('denque (non-contiguous)', function () {
    var arr = denque_NonContiguous.toArray();
  })
  .add('double-ended-queue (non-contiguous)', function () {
    var arr = doubleEndedQueue_NonContiguous.toArray();
  })
  .add('denque (non zero head)', function () {
    var arr = denque_NonZeroHead.toArray();
  })
  .add('double-ended-queue (non zero head)', function () {
    var arr = doubleEndedQueue_NonZeroHead.toArray();
  })
  .add('array copy (prealloc + for loop)', function () {
    var arr = new Array(array.length);
    for (var i = 0; i < array.length; i++) arr[i] = array[i];
  })
  .add('array copy (no prealloc + for loop)', function () {
    var arr = new Array();
    for (var i = 0; i < array.length; i++) arr.push(array[i]);
  })
  .add('array copy (slice)', function () {
    var arr = array.slice(0, array.length);
  })
  .on('cycle', function (e) {
    console.log('' + e.target);
  })
  .run();
