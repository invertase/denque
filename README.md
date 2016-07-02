# DENQUE

[![Coverage Status](https://coveralls.io/repos/github/Salakar/denque/badge.svg?branch=master)](https://coveralls.io/github/Salakar/denque?branch=master)
![Downloads](https://img.shields.io/npm/dt/denque.svg)
[![npm version](https://img.shields.io/npm/v/denque.svg)](https://www.npmjs.com/package/denque)
[![dependencies](https://img.shields.io/david/Salakar/denque.svg)](https://david-dm.org/Salakar/denque)
[![build](https://travis-ci.org/Salakar/denque.svg)](https://travis-ci.org/Salakar/denque)
[![License](https://img.shields.io/npm/l/denque.svg)](/LICENSE)


## Benchmarks

### 1000 items in queue

    denque x 31,015,027 ops/sec ±1.52% (86 runs sampled)
    double-ended-queue x 21,350,509 ops/sec ±1.21% (86 runs sampled)

### 2 million items in queue

    denque x 28,710,051 ops/sec ±0.95% (87 runs sampled)
    double-ended-queue x 20,531,490 ops/sec ±1.04% (89 runs sampled)
