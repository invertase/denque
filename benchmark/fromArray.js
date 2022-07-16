'use strict';

require('./print');

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

var Denque = require('./../');
var DoubleEndedQueue = require('double-ended-queue');

var l = 100000;

var baseArray = new Array(l);

while (--l) {
  baseArray.push(l);
}

suite
  .add('denque', function () {
    var queue = new Denque(baseArray);
  })
  .add('double-ended-queue', function () {
    var queue = new DoubleEndedQueue(baseArray);
  })
  .on('cycle', function (e) {
    console.log('' + e.target);
  })
  .run();
