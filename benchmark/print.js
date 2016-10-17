'use strict';

console.log("Platform info:");

var os = require("os");
var v8 = process.versions.v8;
var node = process.versions.node;
var plat = os.type() + " " + os.release() + " " + os.arch() + "\nNode.JS " + node + "\nV8 " + v8;

var cpus = os.cpus().map(function (cpu) {
  return cpu.model;
}).reduce(function (o, model) {
  if (!o[model]) o[model] = 0;
  o[model]++;
  return o;
}, {});

cpus = Object.keys(cpus).map(function (key) {
  return key + " \u00d7 " + cpus[key];
}).join("\n");

console.log(plat + "\n" + cpus + "\n");

module.exports = {};
