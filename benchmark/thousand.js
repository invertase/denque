'use strict';

require('./print');

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

const Denque = require('./../compat');
const DoubleEndedQueue = require('double-ended-queue');

const denque = new Denque();
const doubleEndedQueue = new DoubleEndedQueue();

let l = 1000;

while (--l) {
  denque.push(l);
  doubleEndedQueue.push(l);
}

suite
  .add('denque', function () {
    const a = denque.shift();
    const b = denque.shift();
    const c = denque.shift();

    denque.push(a);
    denque.push(b);
    denque.push(c);
  })
  .add('double-ended-queue', function () {
    const a = doubleEndedQueue.shift();
    const b = doubleEndedQueue.shift();
    const c = doubleEndedQueue.shift();

    doubleEndedQueue.push(a);
    doubleEndedQueue.push(b);
    doubleEndedQueue.push(c);
  })
  .on('cycle', function (e) {
    console.log('' + e.target);
  })
  .run();
