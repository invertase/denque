'use strict';

require('./print');

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

var Denque = require('./../');
var DoubleEndedQueue = require('double-ended-queue');

var n = 1000;

suite
  .add('denque', function () {
    var denque = new Denque();

    for (var i = 0; i < n; i++) denque.push(i);
    for (var i = 0; i < n / 2; i++) denque.shift();
    for (var i = 0; i < n; i++) denque.push(i);
    for (var i = 0; i < n + n / 2; i++) denque.shift();
  })
  .add('double-ended-queue', function () {
    var doubleEndedQueue = new DoubleEndedQueue();

    for (var i = 0; i < n; i++) doubleEndedQueue.push(i);
    for (var i = 0; i < n / 2; i++) doubleEndedQueue.shift();
    for (var i = 0; i < n; i++) doubleEndedQueue.push(i);
    for (var i = 0; i < n + n / 2; i++) doubleEndedQueue.shift();
  })
  .on('cycle', function (e) {
    console.log('' + e.target);
  })
  .run();
