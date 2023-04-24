// ## CURRYING
// Hàm transaction để xử lý giao dịch ngân hàng
const transaction = (fee, balance, amount) => balance + amout - fee;

// Cách thực hiện curry đơn giản
const curry =
  (fn, ...args) =>
  (..._arg) =>
    fn(...args, ..._arg);

// Có thể dễ dàng sử dụng lại logic giao dịch cho loại giao dịch "free"
const freeTransaction = curry(transaction, 0);

freeTransaction(10, 90); // = 100
freeTransaction(100, 90); // = 190
// https://ramdajs.com/docs/#curry is an good option to implements currying

// ## COMPOSITION
// Compose function
const compose =
  (...fns) =>
  (x) =>
    fns.reduce((y, f) => f(y), x);

// Functions
const addFee = (amount) => amount + 2;
const addDiscount = (amount) => amount - 5;

// Function composition
const composition = compose(addFee, addDiscount)(100);

// ## CLOSURES
function counter() {
  let count = 0;

  function increment() {
    return (count += 1);
  }

  return increment;
}

const generateId = counter();

generateId(); // 1
generateId(); // 2
generateId(); // 3

// ## NULLISH
// Falsy values
const value = 0 ?? 100; // = 0
const value_1 = false ?? true; // = false

// Default values
const value_2 = null ?? 100; // = 100
const value_3 = undefined ?? 100; // = 100;

// ## REFLECT API
const person = {
  name: 'Bob',
  [Symbol('email')]: 'bob@evil.com',
};

Reflect.get(person, 'name'); // = Bob
Reflect.has(person, 'email'); // = true
Reflect.has(person, 'phone'); // = false
Reflect.getPrototypeOf(person); // = { constructor ... }
Reflect.getOwnPropertyDescriptor(person, 'name'); // = { value: 'Bob', writable: true, enumerable: true, configurable: true }
Reflect.ownKeys(person); // name, Symbol(email)

Reflect.defineProperty(person, 'phone', { writable: true });
Reflect.has(person, 'phone'); // = true
Reflect.set(person, 'phone', '123456789');

Reflect.deleteProperty(person, 'phone');
Reflect.has(person, 'phone'); // = false
