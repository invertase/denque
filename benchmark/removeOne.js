'use strict';

require('./print');

var Denque = require('./../');
var Benchmark = require('benchmark');

var suite = new Benchmark.Suite();

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
    var b = denque.removeOne(50);
    var c = denque.removeOne(500);
    denque.push(a);
    denque.push(b);
    denque.push(c);
  })
  .add('native array splice', function () {
    var a = array.splice(5, 1)[0];
    var b = array.splice(50, 1)[0];
    var c = array.splice(500, 1)[0];
    array.push(a);
    array.push(b);
    array.push(c);
  })
  .on('cycle', function (e) {
    console.log('' + e.target);
  })
  .run();
