declare class Denque {
  constructor();
  constructor(array: any[]);

  push(item: any): number;
  unshift(item: any): number;
  pop(): any;
  removeBack(): any;
  shift(): any;
  peekBack(): any;
  peekFront(): any;
  peekAt(index: number): any;
  get(index: number): any;
  remove(index: number, count: number): any[];
  removeOne(index: number): any;
  splice(index: number, count: number, ...item: any[]): any[];
  isEmpty(): boolean;
  clear(): void;

  toString(): string;
  toArray(): any[];

  length: number;
}

export = Denque;
