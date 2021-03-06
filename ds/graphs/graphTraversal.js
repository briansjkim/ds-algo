// an undirected graph with an adjacency list

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(v1, v2) {
    if (!this.adjacencyList[v1].includes(v2)) {
      this.adjacencyList[v1].push(v2);
    }
    if (!this.adjacencyList[v2].includes(v1)) {
      this.adjacencyList[v2].push(v1);
    }
    return this;
  }

  removeEdge(v1, v2) {
    if (this.adjacencyList[v1].includes(v2)) {
      this.adjacencyList[v1] = this.adjacencyList[v1].filter( v => v !== v2);
    }
    if (this.adjacencyList[v2].includes(v1)) {
      this.adjacencyList[v2] = this.adjacencyList[v2].filter( v => v !== v1);
    }
    return this;
  }

  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length) {
      var adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(adjacentVertex, vertex);
    }
    delete this.adjacentList[vertex];
    return this;
  }

  depthFirstRecursive(vertex) {
    var result = [];
    var visited = {};

    // 'this' loses its meaning in an IIFE, so define 'this' to a variable to use inside the IIFE
    var adjacencyList = this.adjacencyList;
    (function traverse(vertex) {
      if (!vertex) { return null; }
      visited[vertex] = true;
      result.push(vertex);

      adjacencyList[vertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          traverse(neighbor);
        }
      })
    })(vertex);

    return result;
  }

  breadthFirst(vertex) {
    var result = [];
    var queue = [vertex];
    var visited = {};
    let currentVertex;

    while (queue.length) {
      currentVertex = queue.shift();
      result.push(currentVertex);
      visited[currentVertex] = true;

      this.adjacencyList[currentVertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      })
    }
    return result;
  }
}

