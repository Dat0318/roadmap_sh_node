## Introduction
Have you ever been told that you can't use "async/await" with "forEach" in JavaScript? One of our team members was recently told this and it got us wondering - why is this the case? In this article, we'll take a closer look at this topic and explain why this is a common misconception.

## The Problem
Let's take a look at the following code:

```javascript
async function testAsync(v) {
  await new Promise((resolve) => {
    setTimeout(resolve, 100);
  });
  return v + 1;
}

const data = [];
const params = [0, 1, 2];
params.forEach(async (v) => {
  const res = await testAsync(v);
  console.log(res);
  data.push(res);
});
console.log(data);
```

In this code, we have an asynchronous function "testAsync" that takes in a value and returns that value plus 1 after a 100ms delay. We then have an empty array "data" and an array of numbers "params". We use the "forEach" method to loop through "params" and call "testAsync" for each value. We then log the result and push it into the "data" array. The expectation is that the "data" array will end up being [1, 2, 3], but in reality, it is an empty array.

This is where the confusion starts. The idea is that by using "await" inside of the "forEach" callback, we are waiting for the asynchronous function to complete before moving on to the next iteration. But this is not the case.

## The Misconception
The problem here is that the person writing this code is misunderstanding how "await" works. "Await" only works when it is used inside of an "async" function. In the example above, we are using "async" on the callback function passed to "forEach", but this is not the same as using "async" on the outer function. The callback function passed to "forEach" is not an "async" function and therefore, "await" does not work as intended.

This is where the misconception comes in. Many people think that by using "async" on the callback function passed to "forEach", they are making that function asynchronous. But this is not the case. The callback function is still a synchronous function and therefore, "await" does not work inside of it.

## The Solution
So, what can we do to fix this problem? One solution is to use a regular "for" loop instead of "forEach". In this case, "await" will work as intended.

```javascript
for (const v of params) {
  const res = await testAsync(v);
  console.log(res);
  data.push(res);
}
console.log(data);
```

This code will give us the expected result of [1, 2, 3].

Another solution is to use the "map" method and then "Promise.all" to wait for all the promises to complete.

```javascript
const data = await Promise.all(params.map(async (v) => {
  const res = await testAsync(v);
  return res;
}));
console.log(data);
```

This will give us the same expected result of [1, 2, 3].

## Bonus
As a bonus, here is an example of a more intuitive way to use "async/await" with "forEach" in JavaScript.

```javascript
Array.prototype.forEachAsync = async function(callback, thisArg) {
  const promises = [];
  this.forEach(function(...args) {
    promises.push(callback.call(this, ...args));
  }, thisArg);
  return await Promise.all(promises);
}

async function sampleAsync(v) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  return v + 1;
}

const data = [];
const params = [0, 1, 2];
await params.forEachAsync(async (v) => {
  const res = await sampleAsync(v);
  console.log(res);
  data.push(res);
});
console.log(data);
```

In this example, we are adding an "forEachAsync" function to the Array prototype. This function works just like the regular "forEach" function but it returns a promise that resolves when all the callbacks passed to it have resolved. This means that we can use "await" to wait for all the callbacks to complete before moving on. As a result, in the last code snippet, we will get the output "1 2 3 [1, 2, 3]" which is the expected result.

It's worth noting that this implementation of forEachAsync could also have an issue similar to the previous code examples if the callback passed to it is not asynchronous, or if it uses await inside of a non-async function.

This approach is also not considered a good practice, as modifying the Array prototype could lead to unexpected results and naming collisions with other code. It's better to use a more explicit solution, like the ones previously mentioned.