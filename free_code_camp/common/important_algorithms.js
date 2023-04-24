// ################# BUBBLE SORT ####################################
// https://tuan200tokyo.blogspot.com/2023/01/blog85-bubble-up-to-top-beginners-guide.html

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
console.log(bubbleSort([5, 3, 8, 2, 1, 4])); // [1, 2, 3, 4, 5, 8]

// ################# MERGE SORT #####################################

function mergeSort(arr) {
  if (arr.length < 2) return arr;
  let middle = Math.floor(arr.length / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right) {
  let result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length) result.push(left.shift());
  while (right.length) result.push(right.shift());
  return result;
}
console.log(mergeSort([5, 3, 8, 2, 1, 4])); // [1, 2, 3, 4, 5, 8]

// ################# QUICK SORT #####################################
// https://tuan200tokyo.blogspot.com/2023/01/blog87-sorting-things-out-comprehensive.html

function quickSort(arr) {
  if (arr.length < 2) return arr;
  let pivot = arr[arr.length - 1];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(pivot, quickSort(right));
}
console.log(quickSort([5, 3, 8, 2, 1, 4])); // [1, 2, 3, 4, 5, 8]

// ################# HEAP SORT ######################################

function heapSort(arr) {
  let n = arr.length;
  for (let i = n / 2 - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  for (let i = n - 1; i >= 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}
function heapify(arr, n, i) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;
  if (l < n && arr[l] > arr[largest]) {
    largest = l;
  }
  if (r < n && arr[r] > arr[largest]) {
    largest = r;
  }
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}
console.log(heapSort([5, 3, 8, 2, 1, 4])); // [1, 2, 3, 4, 5, 8]

// ################# SEARCHING ######################################
// ################# BINARY SEARCH ##################################

function binarySearch(arr, x) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let middle = Math.floor((left + right) / 2);
    if (arr[middle] === x) {
      return middle;
    } else if (arr[middle] < x) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }
  return -1;
}
console.log(binarySearch([1, 2, 3, 4, 5, 8], 4)); // 3

// ################# BREADTH-FIRST SEARCH ###########################

function breadthFirstSearch(root, target) {
  let queue = [root];
  while (queue.length) {
    let node = queue.shift();
    if (node.value === target) return node;
    queue.push(...node.children);
  }
  return null;
}

// ################# DEPTH-FIRST SEARCH #############################

function depthFirstSearch(node, target) {
  if (node.value === target) return node;
  for (let child of node.children) {
    let found = depthFirstSearch(child, target);
    if (found) return found;
  }
  return null;
}

// ################# DYNAMIC PROGRAMMING ############################

function fibonacci(n) {
  let dp = [];
  dp[0] = 0;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
console.log(fibonacci(5)); // 5

// ################# RECURSION ######################################
// https://tuan200tokyo.blogspot.com/2023/01/blog83-introduction-to-recursion.html

function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(5)); // 120

// ################# DEVIDE AND CONQUER #############################

function closestPair(points) {
  let minDistance = Number.MAX_SAFE_INTEGER;
  let closestPair = [];
  points.sort((a, b) => a.x - b.x);
  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let distance = Math.sqrt((points[i].x - points[j].x) ** 2 + (points[i].y - points[j].y) ** 2);
      if (distance < minDistance) {
        minDistance = distance;
        closestPair = [points[i], points[j]];
      }
    }
  }
  return closestPair;
}
console.log(
  closestPair([
    { x: 0, y: 0 },
    { x: 3, y: 4 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 5, y: 6 },
  ])
);

// ################# HASH MAP #######################################

class HashMap {
  constructor() {
    this.buckets = Array(10)
      .fill(null)
      .map(() => []);
    this.keys = this.keys = {};
  }

  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.buckets.length;
  }

  set(key, value) {
    let index = this.hash(key);
    for (let bucket of this.buckets[index]) {
      if (bucket[0] === key) {
        bucket[1] = value;
        return;
      }
    }
    this.buckets[index].push([key, value]);
    this.keys[key] = value;
  }

  get(key) {
    let index = this.hash(key);
    for (let bucket of this.buckets[index]) {
      if (bucket[0] === key) {
        return bucket[1];
      }
    }
    return null;
  }

  delete(key) {
    let index = this.hash(key);
    let i = 0;
    for (let bucket of this.buckets[index]) {
      if (bucket[0] === key) {
        this.buckets[index].splice(i, 1);
        delete this.keys[key];
        return;
      }
      i++;
    }
  }
}

let map = new HashMap();
map.set('name', 'John Smith');
map.set('age', 30);
console.log(map.get('name')); // "John Smith"
console.log(map.get('age')); // 30
map.delete('name');
console.log(map.get('name')); // null

// ##################################################################
