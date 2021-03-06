/**
 * Doubly LLs are the same as Singly LLs except that each node has both a next and previous pointer
 */

function Node(val) {
  this.val = val;
  this.next = null;
  this.prev = null;
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // time complexity: Constant O(1)
  push(val) {
    let newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.length++;
    return this;
  }

  // time complexity: Constant O(1)
  pop() {
    if (this.length === 0) { return undefined; }

    let removedNode = this.tail;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = removedNode.prev;
      this.tail.next = null;
      removedNode.prev = null;
    }
    this.length--;
    return removedNode;
  }

  // time complexity: Constant O(1)
  shift() {
    if (!this.head) { return undefined; }
    let removedNode = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = removedNode.next;
      removedNode.next = null;
      this.head.prev = null;
    }
    this.length--;
    return removedNode;
  }

  // time complexity: Constant O(1)
  unshift(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  // time complexity: Linear O(N); technically O(N/ 2) because we're only traversing half, but still O(N)
  get(idx) {
    if (idx < 0 || idx >= this.length) { return undefined; }

    let mid = Math.floor(this.length / 2);
    let counter;
    let current;

    if (idx <= mid) {
      current = this.head;
      counter = 0;

      while (counter !== idx) {
        current = current.next;
        counter++;
      }
    } else {
      current = this.tail;
      counter = this.length - 1;

      while (counter !== idx) {
        current = current.prev;
        counter--;
      }
    }

    return current;
  }

  // time complexity: Linear O(N)
  set(val, idx) {
    let retrievedNode = this.get(idx);

    if (retrievedNode) {
      retrievedNode.val = val;
      return true;
    }
    return false;
  }

  // time complexity: Best = Constant O(1), worst = Linear O(N)
  insert(val, idx) {
    if (idx < 0 || idx >= this.length) { return false; }
    if (idx === 0) { this.unshift(val); }
    if (idx === this.length) { this.push(val); }

    // get the node at idx - 1
    let retrievedNode = this.get(idx - 1);
    let newNode = new Node(val);
    // get the node after idx - 1
    let nextNode = retrievedNode.next;

    // if retrievedNode is valid
    if (retrievedNode) {
      // set its next to the new node
      retrievedNode.next = newNode;
      // set the new node's prev to the retrieved node
      newNode.prev = retrievedNode;
      // set the new node's next to the nextNode
      newNode.next = nextNode;
      // set the nextNode's prev to the new node
      nextNode.prev = newNode;
      this.length++;
      return true;
    }

    return false;
  }

  // time complexity: best = Constant O(1), worst = Linear O(N)
  remove(idx) {
    if (idx < 0 || idx >= this.length) { return false; }
    if (idx === 0) { this.shift(); }
    if (idx === this.length - 1) { this.pop(); }

    let removedNode = this.get(idx);
    let prevNode = removedNode.prev;
    let nextNode = removedNode.next;

    if (removedNode) {
      prevNode.next = nextNode;
      nextNode.prev = prevNode;
      removedNode.next = null;
      removedNode.prev = null;
      this.length--;
      return true;
    }

    return false;
  }
}
