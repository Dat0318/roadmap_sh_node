// DOCUMENT: https://www.tutorialsteacher.com/typescript

interface KeyValueProcessor {
  (key: number, value: string): void;
}

function addKeyValue(key: number, value: string): void {
  console.log('addKeyValue: key = ' + key + ', value = ' + value);
}

function updateKeyValue(key: number, value: string): void {
  console.log('updateKeyValue: key = ' + key + ', value = ' + value);
}

let kvp: KeyValueProcessor = addKeyValue;
kvp(1, 'Bill'); //Output: addKeyValue: key = 1, value = Bill

kvp = updateKeyValue;
kvp(2, 'Steve'); //Output: updateKeyValue: key = 2, value = Steve

interface NumList {
  [index: number]: number;
}

let numArr: NumList = [1, 2, 3];
numArr[0];
numArr[1];

interface IStringList {
  [index: string]: string;
}

let strArr: IStringList = {};
strArr['TS'] = 'TypeScript';
strArr['JS'] = 'JavaScript';

// ### EXTENDS ### //
interface IPerson {
  name: string;
  gender: string;
}

interface IEmployee extends IPerson {
  empCode: number;
}

let empObj: IEmployee = {
  empCode: 1,
  name: 'Bill',
  gender: 'Male',
};

// ### IMPLEMENTS ### //
interface IEmployees {
  empCode: number;
  name: string;
  getSalary: (empCode: number) => number;
}

class Employee implements IEmployees {
  empCode: number;
  name: string;

  constructor(code: number, name: string) {
    this.empCode = code;
    this.name = name;
  }

  getSalary(empCode: number): number {
    return 20000;
  }
}

let emp = new Employee(1, 'Steve');

// ### ABSTRACT CLASS ### //

abstract class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  display(): void {
    console.log(this.name);
  }

  abstract find(name: string): Person;
}

class Employee1 extends Person {
  empCode: number;

  constructor(name: string, code: number) {
    super(name); // must call super()
    this.empCode = code;
  }

  find(name: string): Person {
    // execute AJAX request to find an employee from a db
    return new Employee1(name, 1);
  }
}

let emp1: Person = new Employee1('James', 100);
emp1.display(); //James

let emp_1: Person = emp1.find('Steve');

// ### ABSTRACT CLASS WITH ABSTRACT PROPERTY ### //

abstract class Person2 {
  abstract name: string;

  display(): void {
    console.log(this.name);
  }
}

class Employee2 extends Person2 {
  name: string;
  empCode: number;

  constructor(name: string, code: number) {
    super(); // must call super()

    this.empCode = code;
    this.name = name;
  }
}

let emp2: Person2 = new Employee2('James', 100);
emp2.display(); //James

// ### Data Modifiers ### //

class Employee3 {
  public empName: string;
  protected empCode: number;
  readonly readEmpCode: number;

  constructor(name: string, code: number, readCode: number) {
    this.empName = name;
    this.empCode = code;
    this.readEmpCode = readCode;
  }
}

class SalesEmployee extends Employee3 {
  private department: string;

  constructor(name: string, code: number, department: string) {
    super(name, code, code);
    this.department = department;
  }
}

let emp3 = new SalesEmployee('John Smith', 123, 'Sales');
// emp3.empCode; //Compiler Error

// ### Static ### //

class Circle {
  static pi = 3.14;

  static calculateArea(radius: number) {
    return this.pi * radius * radius;
  }

  calculateCircumference(radius: number): number {
    return 2 * Circle.pi * radius;
  }
}

Circle.calculateArea(5); // returns 78.5

let circleObj = new Circle();
circleObj.calculateCircumference(5); // returns 31.4000000
//circleObj.calculateArea(); <-- cannot call this

export let age: number = 20;
export class Employee4 {
  empCode: number;
  empName: string;
  constructor(name: string, code: number) {
    this.empName = name;
    this.empCode = code;
  }
  displayEmployee() {
    console.log('Employee Code: ' + this.empCode + ', Employee Name: ' + this.empName);
  }
}
let companyName: string = 'XYZ';

let empObj4 = new Employee4('Steve Jobs', 1);
empObj4.displayEmployee(); //Output: Employee Code: 1, Employee Name: Steve Jobs

// ### NAMESPACE ### //
namespace StringUtility {
  function ToCapital(str: string): string {
    return str.toUpperCase();
  }

  function SubString(str: string, from: number, length: number = 0): string {
    return str.substr(from, length);
  }
}

// ### GENERIC FUNCTION ### //
function getArray<T>(items: T[]): T[] {
  return new Array<T>().concat(items);
}

let myNumArr = getArray<number>([100, 200, 300]);
let myStrArr = getArray<string>(['Hello', 'World']);

myNumArr.push(400); // OK
myStrArr.push('Hello TypeScript'); // OK

function displayType<T, U>(id: T, name: U): void {
  console.log(typeof id + ', ' + typeof name);
}
displayType<number, string>(1, 'Steve'); // number, string

function displayType1<T>(id: T, name: string): void {
  console.log(typeof id + ', ' + typeof name);
}
displayType1<number>(1, 'Steve'); // number, string

function displayType2<T, U>(id: T, name: U): void {
  id?.toString(); // OK
  name?.toString(); // OK

  // id.toFixed(); // Compiler Error: 'toFixed' does not exists on type 'T'
  // name.toUpperCase(); // Compiler Error: 'toUpperCase' does not exists on type 'U'

  console.log(typeof id + ', ' + typeof name);
}

function displayNames3<T>(names: T[]): void {
  console.log(names.join(', '));
}
displayNames3<string>(['Steve', 'Bill']); // Steve, Bill

class Person1 {
  firstName: string;
  lastName: string;

  constructor(fname: string, lname: string) {
    this.firstName = fname;
    this.lastName = lname;
  }
}

function display<T extends Person1>(per: T): void {
  console.log(`${per.firstName} ${per.lastName}`);
}
var per = new Person1('Bill', 'Gates');
display(per); //Output: Bill Gates

// display("Bill Gates");//Compiler Error
interface IProcessor<T> {
  result: T;
  process(a: T, b: T): T;
}

interface KeyPair<T, U> {
  key: T;
  value: U;
}
let kv1: KeyPair<number, string> = { key: 1, value: 'Steve' }; // OK
let kv2: KeyPair<number, number> = { key: 1, value: 12345 }; // OK

interface KeyValueProcessor_1<T, U> {
  (key: T, val: U): void;
}

function processNumKeyPairs(key: number, value: number): void {
  console.log('processNumKeyPairs: key = ' + key + ', value = ' + value);
}
function processStringKeyPairs(key: number, value: string): void {
  console.log('processStringKeyPairs: key = ' + key + ', value = ' + value);
}

let numKVProcessor: KeyValueProcessor_1<number, number> = processNumKeyPairs;
numKVProcessor(1, 12345); //Output: processNumKeyPairs: key = 1, value = 12345
let strKVProcessor: KeyValueProcessor_1<number, string> = processStringKeyPairs;
strKVProcessor(1, 'Bill'); //Output: processStringKeyPairs: key = 1, value = Bill

interface IKeyValueProcessor<T, U> {
  process(key: T, val: U): void;
}
class kvProcessor implements IKeyValueProcessor<number, string> {
  process(key: number, val: string): void {
    console.log(`Key = ${key}, val = ${val}`);
  }
}
let proc: IKeyValueProcessor<number, string> = new kvProcessor();
proc.process(1, 'Bill'); //Output: processKeyPairs: key = 1, value = Bill

// ### GENERIC CLASS ### //
class KeyValuePair<T, U> {
  private key: T;
  private val: U;

  constructor(key: T, val: U) {
    this.key = key;
    this.val = val;
  }

  setKeyValue(key: T, val: U): void {
    this.key = key;
    this.val = val;
  }

  display(): void {
    console.log(`Key = ${this.key}, val = ${this.val}`);
  }
}

let kvp1 = new KeyValuePair<number, string>(12, 'name');
kvp1.setKeyValue(1, 'Steve');
kvp1.display(); //Output: Key = 1, Val = Steve

let kvp2 = new KeyValuePair<string, string>('age', 'name');
kvp2.setKeyValue('CEO', 'Bill');
kvp2.display(); //Output: Key = CEO, Val = Bill

interface IKeyValueProcessor<T, U> {
  process(key: T, val: U): void;
}

class kvProcessor_1<T, U> implements IKeyValueProcessor<T, U> {
  process(key: T, val: U): void {
    console.log(`Key = ${key}, val = ${val}`);
  }
}

let proc_1: IKeyValueProcessor<number, string> = new kvProcessor_1();
proc.process(1, 'Bill'); //Output: key = 1, value = Bill
