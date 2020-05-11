/**
 * A linked list contains a head, tail, and length (sometimes) property
 *
 * Linked Lists consists of nodes and each node has a value and a pointer to another node or null
 *
 * Singly Linked Lists are only connected to the next node, not the previous node
 */

function Node(val) {
  this.val = val;
  this.next = null;
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    var newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // set the next pointer to the new node
      this.tail.next = newNode;
      // then set the tail to the new node
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  pop() {
    if (!this.head) { return undefined; }

    // start at the head
    var current = this.head;
    // we want to create another pointer to lag one node behind current in order to get the second to last node
    var newTail;

    while (current.next) {
      newTail = current;
      current = current.next;
    }

    this.tail = newTail;
    this.tail.next = null;
    this.length--;

    // if the LL only had one node, we want to set both head and tail as null
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }

  // removing a new node from the LL
  shift() {
    if (!this.head) { return undefined; }

    // get the current head
    var prevHead = this.head;
    // assign the next node to be the new head
    this.head = prevHead.next;
    // remove the next pointer from the old head
    prevHead.next = null;
    this.length--;
    return prevHead;
  }

  // adding a new node to the head
  unshift(val) {
    let newHead = new Node(val);

    if (!this.head) {
      this.head = newHead;
      this.tail = newHead;
    } else {
      newHead.next = this.head;
      this.head = newHead;
    }
    this.length++;
    return this;
  }

  // retrieving a node by its position in the LL
  get(position) {
    if (!this.head) { return undefined; }
    if (position < 0 || position >= this.length) { return undefined; }

    let counter = 0;
    let current = this.head;

    while (counter !== position) {
      current = current.next;
      counter++;
    }
    return current;
  }

  // changing the value of a node based on its position in the LL
  // accepts a value and an index
  // Ex: set(9, 1) => the node's val at the SECOND position will be changed zero index)
  set(val, position) {
    let node = this.get(position);

    if (!node) {
      return false;
    } else {
      node.val = val;
      return true;
    }
  }
}

var singly = new SinglyLinkedList;
// console.log(singly.push(1));
// console.log(singly.push(2));
// console.log(singly.push(3));
