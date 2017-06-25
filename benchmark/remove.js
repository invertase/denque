'use strict';

require('./print');

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

var Denque = require('./../');

var denque = new Denque();
var array = []

var l = 100000;

while (--l) {
  denque.push(l);
  array.push(l);
}

suite
  .add('denque.remove', function () {
    denque.remove(111, 100);
  })
  .add('native array splice', function () {
    array.splice(111, 100);
  })
  .on('cycle', function (e) {
    console.log('' + e.target);
  })
  .run();