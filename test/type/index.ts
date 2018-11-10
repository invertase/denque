// See https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-class-d-ts.html
import Denque = require("../../");

const queue = new Denque(["my", "super", "array"]);
new Denque(); // also work

queue.push("awesome");
queue.unshift("typescript");
queue.pop();
queue.shift();
queue.toArray();
queue.peekBack();
queue.peekFront();
queue.get(1);
var entry = queue.peekAt(1);
if (entry !== undefined) {
    entry.length;
}
queue.remove(1, 1);
queue.removeOne(1);
queue.toString();

queue.splice(queue.length, 0, "8", "9", "10");
queue.splice(3, 3, "44", "55", "66");

queue.isEmpty();
queue.clear();
