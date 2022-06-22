/* eslint-disable no-unused-vars */
interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getHead: () => { value: T | null; index: number; };
  getTail: () => { value: T | null; index: number; };
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];

  head = 0;

  tail = 0;

  private readonly size: number = 0;

  length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error('Maximum length exceeded');
    }
    this.container[this.tail] = item;
    this.tail += 1;
    this.length += 1;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }

    if (this.head === this.size) {
      this.head = 0;
    }
    this.container[this.head] = null;
    this.length -= 1;
    this.head += 1;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }
    return this.container[this.head % this.size];
  };

  isEmpty = () => this.length === 0;

  clear = () => {
    this.container = [];
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };

  getHead = () => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }
    return { value: this.container[this.head], index: this.head };
  };

  getTail = () => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }
    return { value: this.container[this.tail - 1], index: this.tail - 1 };
  };
}
