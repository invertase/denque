'use strict';

require('./print');

var Benchmark = require('benchmark');
var Denque = require('./../');

var suite = new Benchmark.Suite();

var denque = new Denque();
var array = []

var l = 100000;
while (--l) {
  denque.push(l);
  array.push(l);
}

suite
  .add('denque.splice', function () {
    denque.splice(111, 1, 11, 12, 13, 14, 15, 16);
  })
  .add('native array splice', function () {
    array.splice(111, 1, 11, 12, 13, 14, 15, 16);
  })
  .on('cycle', function (e) {
    console.log('' + e.target);
  })
  .run();
