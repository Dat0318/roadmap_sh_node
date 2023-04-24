export function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  } else {
    let pivot = arr[0];
    let left = [];
    let right = [];

    for (let i = 1; i < arr.length; i++) {
      arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
    }

    return quickSort(left).concat(pivot, quickSort(right));
  }
}

console.log(quickSort([5, 8, 1, 3, 7, 9, 2])); // [1, 2, 3, 5, 7, 8, 9]

// Merge Sort Algorithm in Javascript
// Merge Sort is a divide and conquer algorithm.
// It divides input array in two halves, calls itself for the two halves and then merges the two sorted halves.
// The merge() function is used for merging two halves. The merge(arr, l, m, r) is key process that assumes that arr[l..m] and arr[m+1..r] are sorted and merges the two sorted sub-arrays into one.
// A function that sorts an array of integers using Merge Sort algorithm.
export function mergeSort(arr) {
  if (arr.length === 1) {
    // return once we hit an array with a single item
    return arr;
  }

  const middle = Math.floor(arr.length / 2); // get the middle item of the array rounded down
  const left = arr.slice(0, middle); // items on the left side
  const right = arr.slice(middle); // items on the right side

  return merge(mergeSort(left), mergeSort(right));
}

// compare the arrays item by item and return the concatenated result
function merge(left, right) {
  let result = [];
  let indexLeft = 0;
  let indexRight = 0;

  while (indexLeft < left.length && indexRight < right.length) {
    if (left[indexLeft] < right[indexRight]) {
      result.push(left[indexLeft]);
      indexLeft++;
    } else {
      result.push(right[indexRight]);
      indexRight++;
    }
  }

  return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
}

const list = [2, 5, 1, 3, 7, 2, 3, 8, 6, 3];
console.log(mergeSort(list)); // [ 1, 2, 2, 3, 3, 3, 5, 6, 7, 8 ]

export function heapSort(arr) {
  let n = arr.length;
  // Build heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  // One by one extract an element from heap
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    let temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    // call max heapify on the reduced heap
    heapify(arr, i, 0);
  }
  return arr;
}

// To heapify a subtree rooted with node i which is
// an index in arr[]. n is size of heap
function heapify(arr, n, i) {
  let largest = i; // Initialize largest as root
  let l = 2 * i + 1; // left = 2*i + 1
  let r = 2 * i + 2; // right = 2*i + 2
  // If left child is larger than root
  if (l < n && arr[l] > arr[largest]) largest = l;
  // If right child is larger than largest so far
  if (r < n && arr[r] > arr[largest]) largest = r;
  // If largest is not root
  if (largest !== i) {
    let swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;
    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest);
  }
}

console.log(heapSort([3, 6, 8, 10, 1, 2, 1]));

// ################# SEARCH ALGORITHMS ###########################
//A function that takes in an array and a value and returns the index of the value if it is present in the array
async function binarySearch(arr, val) {
  let start = 0;
  let end = arr.length - 1;
  let middle = Math.floor((start + end) / 2);

  while (arr[middle] !== val && start <= end) {
    if (val < arr[middle]) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
    middle = Math.floor((start + end) / 2);
  }

  if (arr[middle] === val) {
    return middle;
  }
  return -1;
}

console.log(binarySearch([1, 2, 3, 4, 5, 6, 7], 4));

// ################# HASH TABLES ###########################
// This example shows the implementation of a Hash Table in JavaScript using an array.
// Create an array to store the hash table
var hashTable = [];

// Create a function to hash each key
export function hashString(key) {
  var hash = 0;
  for (var i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i);
  }
  return hash % 10;
}

// Create a function to add a key/value pair to the hash table
export function addHash(key, value) {
  var index = hashString(key);
  if (hashTable[index] === undefined) {
    hashTable[index] = [[key, value]];
  } else {
    var inserted = false;
    for (var i = 0; i < hashTable[index].length; i++) {
      if (hashTable[index][i][0] === key) {
        hashTable[index][i][1] = value;
        inserted = true;
      }
    }
    if (inserted === false) {
      hashTable[index].push([key, value]);
    }
  }
}

// Create a function to retrieve a value from the hash table
export function getHash(key) {
  var index = hashString(key);
  if (hashTable[index] === undefined) {
    return undefined;
  } else {
    for (var i = 0; i < hashTable[index].length; i++) {
      if (hashTable[index][i][0] === key) {
        return hashTable[index][i][1];
      }
    }
  }
}

addHash('name', 'John'); // Add a key/value pair to the hash table
console.log(getHash('name')); // "John" // Retrieve the value from the hash table

// ################# GRAPH ALGORITHM ###########################
// Dijkstra’s shortest path algorithm
// create a graph object
let graph = {
  start: { A: 5, B: 2 },
  A: { C: 4, D: 2 },
  B: { A: 8, D: 7 },
  C: { D: 6, finish: 3 },
  D: { finish: 1 },
  finish: {},
};

// create a distance object
let distance = {
  A: 5,
  B: 2,
  C: Infinity,
  D: Infinity,
  finish: Infinity,
};

// create a parent object
let parent = {
  A: 'start',
  B: 'start',
  C: null,
  D: null,
  finish: null,
};

// create an array of visited nodes
let visited = [];

// define a function to find the node with the lowest distance
let findLowestDistanceNode = (distance, visited) => {
  let lowestDistance = Infinity;
  let lowestDistanceNode = null;

  for (let node in distance) {
    if (distance[node] < lowestDistance && !visited.includes(node)) {
      lowestDistance = distance[node];
      lowestDistanceNode = node;
    }
  }

  return lowestDistanceNode;
};

// define a function to find the shortest path between two nodes
let dijkstra = (graph, start, finish) => {
  let node = findLowestDistanceNode(distance, visited);

  while (node !== null) {
    let dist = distance[node];
    let neighbors = graph[node];
    for (let neighbor in neighbors) {
      if (neighbors.hasOwnProperty(neighbor)) {
        let newDist = dist + neighbors[neighbor];
        if (distance[neighbor] > newDist) {
          distance[neighbor] = newDist;
          parent[neighbor] = node;
        }
      }
    }

    visited.push(node);
    node = findLowestDistanceNode(distance, visited);
  }

  let shortestPath = [finish];
  let parentNode = parent[finish];
  while (parentNode !== 'start') {
    shortestPath.unshift(parentNode);
    parentNode = parent[parentNode];
  }

  shortestPath.unshift('start');

  console.log(`The shortest path from ${start} to ${finish} is ${shortestPath}`);
  console.log(`The total distance is ${distance[finish]}`);
};

// call the function
dijkstra(graph, 'start', 'finish');

// ################# DYNAMIC PROGRAMMING ###########################
export function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(7)); // 13

// ################# GREEDY ALGORITHMS ###########################
// Huffman coding
// node class is the basic structure of each node present in the Huffman - tree.
class HuffmanNode {
  constructor() {
    this.data = 0;
    this.c = '';
    this.left = this.right = null;
  }
}

// recursive function to print the huffman-code through the tree traversal.
// Here s is the huffman - code generated.
function printCode(root, s) {
  // base case; if the left and right are null
  // then its a leaf node and we print the code s generated by traversing the tree.
  if (root.left == null && root.right == null && root.c.toLowerCase() != root.c.toUpperCase()) {
    // c is the character in the node
    console.log(root.c + ':' + s + '\n');

    return;
  }

  // if we go to left then add "0" to the code. if we go to the right add"1" to the code.

  // recursive calls for left and right sub-tree of the generated tree.
  printCode(root.left, s + '0');
  printCode(root.right, s + '1');
}

// main function number of characters.
let n = 6;
let charArray = ['a', 'b', 'c', 'd', 'e', 'f'];
let charfreq = [5, 9, 12, 13, 16, 45];

// creating a priority queue q. makes a min-priority queue(min-heap).
let q = [];

for (let i = 0; i < n; i++) {
  // creating a Huffman node object and add it to the priority queue.
  let hn = new HuffmanNode();

  hn.c = charArray[i];
  hn.data = charfreq[i];

  hn.left = null;
  hn.right = null;

  // add functions adds the huffman node to the queue.
  q.push(hn);
}

let root = null; // create a root node
q.sort(function (a, b) {
  return a.data - b.data;
});

// Here we will extract the two minimum value
// from the heap each time until
// its size reduces to 1, extract until
// all the nodes are extracted.
while (q.length > 1) {
  // first min extract.
  let x = q[0];
  q.shift();

  let y = q[0]; // second min extract.
  q.shift();

  let f = new HuffmanNode(); // new node f which is equal

  // to the sum of the frequency of the two nodes assigning values to the f node.
  f.data = x.data + y.data;
  f.c = '-';

  f.left = x; // first extracted node as left child.

  f.right = y; // second extracted node as the right child.

  root = f; // marking the f node as the root node.

  q.push(f); // add this node to the priority-queue.
  q.sort(function (a, b) {
    return a.data - b.data;
  });
}

// print the codes by traversing the tree
printCode(root, '');
// f: 0 c: 100 d: 101 a: 1100 b: 1101 e: 111

// ################# DIVIDE AND CONQUER ###########################
// Backtracking:
// Solve Sudoku Puzzle:
function nextEmptySpot(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] === 0) return [i, j];
    }
  }
  return [-1, -1];
}

function checkRow(board, row, value) {
  for (var i = 0; i < board[row].length; i++) {
    if (board[row][i] === value) {
      return false;
    }
  }

  return true;
}

function checkColumn(board, column, value) {
  for (var i = 0; i < board.length; i++) {
    if (board[i][column] === value) {
      return false;
    }
  }

  return true;
}

function checkSquare(board, row, column, value) {
  boxRow = Math.floor(row / 3) * 3;
  boxCol = Math.floor(column / 3) * 3;

  for (var r = 0; r < 3; r++) {
    for (var c = 0; c < 3; c++) {
      if (board[boxRow + r][boxCol + c] === value) return false;
    }
  }

  return true;
}

function checkValue(board, row, column, value) {
  if (
    checkRow(board, row, value) &&
    checkColumn(board, column, value) &&
    checkSquare(board, row, column, value)
  ) {
    return true;
  }

  return false;
}

function solve(board) {
  let emptySpot = nextEmptySpot(board);
  let row = emptySpot[0];
  let col = emptySpot[1];

  if (row === -1) {
    // there is no more empty spots
    return board;
  }

  for (let num = 1; num <= 9; num++) {
    if (checkValue(board, row, col, num)) {
      board[row][col] = num;
      solve(board);
    }
  }

  if (nextEmptySpot(board)[0] !== -1) board[row][col] = 0;

  return board;
}

const board = [
  [0, 5, 1, 3, 6, 2, 7, 0, 0],
  [0, 4, 0, 0, 5, 8, 0, 0, 0],
  [0, 0, 0, 4, 0, 0, 0, 2, 5],
  [0, 8, 0, 0, 0, 0, 9, 0, 3],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [7, 0, 5, 0, 0, 0, 0, 8, 0],
  [1, 2, 0, 0, 0, 9, 0, 0, 0],
  [0, 0, 0, 2, 8, 0, 0, 6, 0],
  [0, 0, 8, 5, 3, 4, 2, 9, 0],
];

console.log(JSON.stringify(solve(board)));

// [8, 5, 1, 3, 6, 2, 7, 4, 9]
// [2, 4, 7, 9, 5, 8, 1, 3, 6]
// [9, 6, 3, 4, 1, 7, 8, 2, 5]
// [4, 8, 6, 7, 2, 5, 9, 1, 3]
// [3, 1, 2, 8, 9, 6, 5, 7, 4]
// [7, 9, 5, 1, 4, 3, 6, 8, 2]
// [1, 2, 4, 6, 7, 9, 3, 5, 8]
// [5, 3, 9, 2, 8, 1, 4, 6, 7]
// [6, 7, 8, 5, 3, 4, 2, 9, 1]

// ################# RANDOMIZED ALGORITHM ###########################
// Randomized QuickSort:

function randomizedQuicksort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let pivot = arr[Math.floor(Math.random() * arr.length)];
  let left = arr.filter((x) => x < pivot);
  let middle = arr.filter((x) => x === pivot);
  let right = arr.filter((x) => x > pivot);
  return randomizedQuicksort(left).concat(middle).concat(randomizedQuicksort(right));
}

console.log(randomizedQuicksort([3, 6, 8, 10, 1, 2, 1, 1, 1]));
