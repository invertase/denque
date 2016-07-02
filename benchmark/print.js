'use strict';

console.log("Platform info:");

const os = require("os");
const v8 = process.versions.v8;
const node = process.versions.node;
const plat = os.type() + " " + os.release() + " " + os.arch() + "\nNode.JS " + node + "\nV8 " + v8;

let cpus = os.cpus().map(function (cpu) {
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
