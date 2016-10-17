'use strict';

require('./print');

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

var Denque = require('./../');
var DoubleEndedQueue = require('double-ended-queue');

var denque = new Denque();
var doubleEndedQueue = new DoubleEndedQueue();

var l = 1000;

while (--l) {
  denque.push(l);
  doubleEndedQueue.push(l);
}

suite
  .add('denque', function () {
    var a = denque.shift();
    var b = denque.shift();
    var c = denque.shift();

    denque.push(a);
    denque.push(b);
    denque.push(c);
  })
  .add('double-ended-queue', function () {
    var a = doubleEndedQueue.shift();
    var b = doubleEndedQueue.shift();
    var c = doubleEndedQueue.shift();

    doubleEndedQueue.push(a);
    doubleEndedQueue.push(b);
    doubleEndedQueue.push(c);
  })
  .on('cycle', function (e) {
    console.log('' + e.target);
  })
  .run();
