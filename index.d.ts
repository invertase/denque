declare class Denque<T = any> {
  constructor();
  constructor(array: T[]);

  push(item: T): number;
  unshift(item: T): number;
  pop(): T;
  removeBack(): T;
  shift(): T;
  peekBack(): T;
  peekFront(): T;
  peekAt(index: number): T;
  get(index: number): T;
  remove(index: number, count: number): T[];
  removeOne(index: number): T;
  splice(index: number, count: number, ...item: T[]): T[];
  isEmpty(): boolean;
  clear(): void;

  toString(): string;
  toArray(): T[];

  length: number;
}

export = Denque;
