interface GenericInterface<T> {
  field: T;
  setField(field: T): void;
  getField(): T;
}

class ImplementationClass implements GenericInterface<number> {
  field: number;

  constructor(field: number) {
    this.field = field;
  }

  setField(field: number): void {
    this.field = field;
  }

  getField(): number {
    return this.field;
  }
}

const instance = new ImplementationClass(123);
// instance.setField(123);
console.log(instance.getField()); // Output: 123

interface Product {
  id: number;
  name: string;
  price: number;
}

function getProduct(id: number): Product {
  return {
    id,
    name: `Awesome Gadget ${id}`,
    price: 99.5,
  };
}

const product = getProduct(1);

console.log(`The product ${product.name} costs ${product.price}`);

let greeting: (name: string) => string;

greeting = function (name: string) {
  return `Hi ${name}`;
};

let description = `This TypeScript string can 
span multiple 
lines
`;

enum Month {
  Jan,
  Feb,
  Mar,
  Apr,
  May,
  Jun,
  Jul,
  Aug,
  Sep,
  Oct,
  Nov,
  Dec,
}

function isItSummer(month: Month) {
  let isSummer: boolean;
  switch (month) {
    case Month.Jun:
    case Month.Jul:
    case Month.Aug:
      isSummer = true;
      break;
    default:
      isSummer = false;
      break;
  }
  return isSummer;
}

enum ApprovalStatus {
  draft,
  submitted,
  approved,
  rejected,
}

const request = {
  id: 1,
  status: ApprovalStatus.approved,
  description: 'Please approve this request',
};

if (request.status === ApprovalStatus.approved) {
  // send an email
  console.log('Send email to the Applicant...');
}

function log(message: any): void {
  console.log(message);
}

function getNetPrice(price: number, discount: number, format: boolean): number | string {
  let netPrice = price * (1 - discount);
  return format ? `$${netPrice}` : netPrice;
}

let netPrice = getNetPrice(100, 0.05, true) as string;
console.log(netPrice);
let netPrice1 = getNetPrice(100, 0.05, true) as string;
console.log(netPrice1);

interface Person {
  firstName: string;
  lastName: string;
}

function getFullName(person: Person) {
  return `${person.firstName} ${person.lastName}`;
}

let john = {
  firstName: 'John',
  lastName: 'Doe',
};

console.log(getFullName(john));

let jane = {
  firstName: 'Jane',
  middleName: 'K.',
  lastName: 'Doe',
  age: 22,
};
let fullName = getFullName(jane);
console.log(fullName); // Jane Doe

// optional properties
interface Person {
  firstName: string;
  middleName?: string;
  lastName: string;
}

// readonly properties
interface Person1 {
  readonly ssn: string;
  firstName: string;
  lastName: string;
}

let person: Person1;
person = {
  ssn: '171-28-0926',
  firstName: 'John',
  lastName: 'Doe',
};

function applyDiscount(price: number, discount: number = 0.05) {
  return price * (1 - discount);
}

console.log(applyDiscount(100)); // 95

function getDay(year: number = new Date().getFullYear(), month: number): number {
  let day = 0;
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      day = 31;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      day = 30;
      break;
    case 2:
      // leap year
      if ((year % 4 == 0 && !(year % 100 == 0)) || year % 400 == 0) day = 29;
      else day = 28;
      break;
    default:
      throw Error('Invalid month');
  }
  return day;
}

function add(a: number | string, b: number | string): number | string | undefined {
  if (typeof a === 'number' && typeof b === 'number') return a + b;

  if (typeof a === 'string' && typeof b === 'string') return a + b;
}

function add1(a: number, b: number): number;
function add1(a: string, b: string): string;
function add1(a: any, b: any): any {
  return a + b;
}

function sum(a: number, b: number): number;
function sum(a: number, b: number, c: number): number;
function sum(a: number, b: number, c?: number): number {
  if (c) return a + b + c;
  return a + b;
}

class Counter {
  private current: number = 0;
  count(): number;
  count(target: number): number[];
  count(target?: number): number | number[] {
    if (target) {
      let values = [];
      for (let start = this.current; start <= target; start++) {
        values.push(start);
      }
      this.current = target;
      return values;
    }
    return ++this.current;
  }
}

let counter = new Counter();

console.log(counter.count()); // return a number
console.log(counter.count(20)); // return an array

class Person2 {
  private ssn: string | number;
  private firstName: string;
  private lastName: string;

  constructor(ssn: string | number, firstName: string, lastName: string) {
    this.ssn = ssn;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  public get _ssn() {
    return Number(this.ssn);
  }

  public set _ssn(theAge: number) {
    if (theAge <= 0 || theAge >= 200) {
      throw new Error('The age is invalid');
    }
    this.ssn = theAge;
  }
}

let person2 = new Person2('171-28-0926', 'John', 'Doe');
console.log(person2.getFullName());

class Person3 {
  private _age: number;
  private _firstName: string;
  private _lastName: string;

  constructor(age: number, firstName: string, lastName: string) {
    this._age = age;
    this._firstName = firstName;
    this._lastName = lastName;
  }

  public get age() {
    return this._age;
  }

  public set age(theAge: number) {
    if (theAge <= 0 || theAge >= 200) {
      throw new Error('The age is invalid');
    }
    this._age = theAge;
  }

  public get firstName() {
    return this._firstName;
  }

  public set firstName(theFirstName: string) {
    if (!theFirstName) {
      throw new Error('Invalid first name.');
    }
    this._firstName = theFirstName;
  }

  public get lastName() {
    return this._lastName;
  }

  public set lastName(theLastName: string) {
    if (!theLastName) {
      throw new Error('Invalid last name.');
    }
    this._lastName = theLastName;
  }

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

class Person4 {
  constructor(private firstName: string, private lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  describe(): string {
    return `This is ${this.firstName} ${this.lastName}.`;
  }
}

class Employee extends Person4 {
  static headcount: number = 0;

  constructor(firstName: string, lastName: string, private jobTitle: string) {
    // call the constructor of the Person class:
    super(firstName, lastName);

    Employee.headcount++;
  }

  describe(): string {
    return super.describe() + `I'm a ${this.jobTitle}.`;
  }

  public static getHeadcount() {
    return Employee.headcount;
  }
}

let employee = new Employee('John', 'Doe', 'Front-end Developer');
let jane1 = new Employee('Jane', 'Doe', 'Back-end Developer');

console.log(employee.getFullName());
console.log(employee.describe());

console.log(Employee.headcount); // 2
console.log(Employee.getHeadcount); // 2

abstract class Employee1 {
  constructor(private firstName: string, private lastName: string) {}
  abstract getSalary(): number;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  compensationStatement(): string {
    return `${this.fullName} makes ${this.getSalary()} a month.`;
  }
}

class FullTimeEmployee extends Employee1 {
  constructor(firstName: string, lastName: string, private salary: number) {
    super(firstName, lastName);
  }

  getSalary(): number {
    return this.salary;
  }
}

class Contractor extends Employee1 {
  constructor(firstName: string, lastName: string, private rate: number, private hours: number) {
    super(firstName, lastName);
  }

  getSalary(): number {
    return this.rate * this.hours;
  }
}

let john2 = new FullTimeEmployee('John', 'Doe', 12000);
let jane2 = new Contractor('Jane', 'Doe', 100, 160);

console.log(john2.compensationStatement());
console.log(jane2.compensationStatement());

//////////// =========================== GENERICS ============================ ///////////////////////////////////////

function getRandomAnyElement(items: any[]): any {
  let randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

let numbers = [1, 5, 7, 4, 2, 9];
let colors = ['red', 'green', 'blue'];

console.log(getRandomAnyElement(numbers));
console.log(getRandomAnyElement(colors));

function getRandomElement<T>(items: T[]): T {
  let randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

let randomEle = getRandomElement<number>(numbers);
console.log(randomEle);

let randomEle1 = getRandomElement<string>(colors);
console.log(randomEle);

function merge<U, V>(obj1: U, obj2: V) {
  return {
    ...obj1,
    ...obj2,
  };
}

let result = merge({ name: 'John' }, { jobTitle: 'Frontend Developer' });

console.log(result);
