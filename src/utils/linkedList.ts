/* eslint-disable no-unused-vars */
interface ILinkedList<T> {
  append: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
  print: () => void;
  findElement: (index: number) => void;
  removeAt: (index: number) => void;
}

class Node<T> {
  value: T;

  // eslint-disable-next-line no-use-before-define
  next: Node<T> | null;

  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;

  private size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  findElement(index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    }
    let currentNode = this.head;
    let count = 0;

    while (currentNode) {
      if (count === index) {
        return currentNode.value;
      }

      count += 1;
      currentNode = currentNode.next;
    }

    return null;
  }

  removeAt(index: number) {
    if (index < 0 || index > this.size) {
      throw new Error('Enter a valid index');
    }

    let curr = this.head;

    if (curr && index === 0) {
      this.head = curr.next;
    } else {
      for (let i = 0; curr != null && i < index - 1; i += 1) {
        curr = curr.next;
      }

      if (curr == null || curr.next == null) {
        return null;
      }

      const { next } = curr.next;

      curr.next = next;
    }

    this.size -= 1;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      throw new Error('Enter a valid index');
    } else {
      const node = new Node(element);

      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else if (this.head) {
        let curr = this.head;
        let currIndex = 0;

        while (currIndex + 1 < index && curr.next) {
          curr = curr.next;
          currIndex += 1;
        }

        const trav = curr.next;
        curr.next = node;
        node.next = trav;
      }

      this.size += 1;
    }
  }

  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size += 1;
  }

  getSize() {
    return this.size;
  }

  print() {
    let curr = this.head;
    let res = '';
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }
}
