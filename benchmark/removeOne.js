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
  .add('denque.removeOne', function () {
    var a = denque.removeOne(5);
  })
  .add('native array splice', function () {
    var a = array.splice(5, 1);
  })
  .on('cycle', function (e) {
    console.log('' + e.target);
  })
  .run();