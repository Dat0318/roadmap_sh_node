import _ from 'lodash';

import { data } from './data.js';

// console.log('----------------------------------------');
// console.log('data: ', data);
// console.log('----------------------------------------');

const arrRoot = [],
  child_key = 'FormConfigChild';

function recurse(arr, key = '') {
  const children = [],
    obj = {};
  arr.forEach((ele, i) => {
    children.push(_.omit(ele, [child_key]));

    if (Array.isArray(ele[child_key])) {
      recurse(ele[child_key], `${key}.${i}`);
    }
  });
  obj[key] = children;
  arrRoot.push(obj);
}

recurse(data);

console.log('----------------------------------------');
console.log('arrRoot: ', JSON.stringify(arrRoot, undefined, 2));
console.log('----------------------------------------');

('use strict');
// BUILDER PARTTERN
class Car {
  constructor(engine, chassis, body) {
    this.engine = engine;
    this.chassis = chassis;
    this.body = body;
  }

  toString() {
    return JSON.stringify(this);
  }
}

class CarBuilder {
  addChassis(chassis) {
    this.chassis = chassis;
    return this;
  }
  addEngine(engine) {
    this.engine = engine;
    return this;
  }
  addBody(body) {
    this.body = body;
    return this;
  }
  build() {
    return new Car(this.engine, this.chassis, this.body);
  }
}

const car = new CarBuilder().addEngine('v12').addBody('KIA SOLUTO').addChassis('LUXURY').build();

const car1 = new CarBuilder().addEngine('v10').addBody('KIA SOLUTO LUXURY').build();

console.log('kakaka Car', car.toString());
console.log('kakaka Car1', car1.toString());

// SIMPLY FACTORY PARTTERN
class VIN {}
class LUXA20 extends VIN {
  run() {
    console.log('LUXA20 Ô tô');
  }
}
class LUXSA20 extends VIN {
  run() {
    console.log('LUXSA20 Ô tô');
  }
}
class VINFactory {
  static produceVIN(model) {
    if (model === 'A.20') {
      return new LUXA20();
    } else {
      return new LUXSA20();
    }
  }
}

const luxA20 = VINFactory.produceVIN('A.20');
const luxSA20 = VINFactory.produceVIN('SA.20');

luxA20.run();
luxSA20.run();

// FACTORY METHOD PATTERN
class VINFactoryMethod {}
class LUXA20Factory extends VINFactoryMethod {
  produceVIN() {
    return new LUXA20();
  }
}
class LUXSA20Factory extends VINFactoryMethod {
  produceVIN() {
    return new LUXSA20();
  }
}

const luxa20Factory = new LUXA20Factory();
const luxsa20Factory = new LUXA20Factory();

const luxa20 = luxa20Factory.produceVIN();
const luxsa20 = luxsa20Factory.produceVIN();

luxa20.run();
luxsa20.run();

// ABSTRACT FACTORY PATTERN
```
abstract class VIN {
  abstract run(): void;
}

class LUXA20 extends VIN {
  run(): void {
    console.log("LUXA20 Ô tô");
  }
}

class LUXSA20 extends VIN {
  run(): void {
    console.log("LUXSA20 Ô tô");
  }
}

abstract class VINFactory {
  abstract produceLUXA20(): LUXA20;
  abstract produceLUXSA20(): LUXSA20;
}

class ConcreteVINFactory extends VINFactory {
  produceLUXA20(): LUXA20 {
    return new LUXA20();
  }

  produceLUXSA20(): LUXSA20 {
    return new LUXSA20();
  }
}
```;
class VIN_ABSTRACT {
  constructor() {
    if (Object.getPrototypeOf(this.constructor) === VIN_ABSTRACT || new.target === VIN_ABSTRACT) {
      throw new TypeError('Cannot construct AbstractClass instances directly');
    }
  }
  run() {}
}

class LUXA20 extends VIN_ABSTRACT {
  run() {
    console.log('LUXA20 Ô tô');
  }
}

class LUXSA20 extends VIN_ABSTRACT {
  run() {
    console.log('LUXSA20 Ô tô');
  }
}

class VIN_FACTORY_ABSTRACT {
  produceLUXA20() {}
  produceLUXSA20() {}
}

class ConcreteVINFactory extends VIN_FACTORY_ABSTRACT {
  produceLUXA20() {
    return new LUXA20();
  }

  produceLUXSA20() {
    return new LUXSA20();
  }
}

const vinFactory = new ConcreteVINFactory();
// const luxA20 = vinFactory.produceLUXA20();
// const luxSA20 = vinFactory.produceLUXSA20();
// luxA20.run();
// luxSA20.run();

// ADAPTER PATTERN
// old interface
function Shipping() {
  this.request = function (zipStart, zipEnd, weight) {
    return '$49.75';
  };
}

// new interface
function AdvancedShipping() {
  this.login = function (credentials) {};
  this.setStart = function (start) {};
  this.setDestination = function (destination) {};
  this.calculate = function (weight) {
    return '$39.50';
  };
}

// adapter interface
function ShippingAdapter(credentials) {
  var shipping = new AdvancedShipping();

  shipping.login(credentials);

  return {
    request: function (zipStart, zipEnd, weight) {
      shipping.setStart(zipStart);
      shipping.setDestination(zipEnd);
      return shipping.calculate(weight);
    },
  };
}

// log helper
var log = (function () {
  var log = '';

  return {
    add: function (msg) {
      log += msg + '\n';
    },
    show: function () {
      alert(log);
      log = '';
    },
  };
})();

function run() {
  var shipping = new Shipping();
  var credentials = { token: '30a8-6ee1' };
  var adapter = new ShippingAdapter(credentials);

  // original shipping object and interface
  var cost = shipping.request('78701', '10010', '2 lbs');
  log.add('Old cost: ' + cost);

  // new shipping object with adapted interface
  cost = adapter.request('78701', '10010', '2 lbs');

  log.add('New cost: ' + cost);
  log.show();
}

const json = [
  { _id: 1, friends: [2, 3, 4] },
  { _id: 2, friends: [1, 3, 5] },
  { _id: 3, friends: [1, 2, 4, 5] },
  { _id: 4, friends: [1, 3, 5] },
  { _id: 5, friends: [2, 3, 4] },
]; //db.friends.find()

const matchFriend = [
  [
    { $match: { _id: { $in: [1, 2] } } },
    { $unwind: '$friends' },
    { $group: { _id: '$friends', count: { $sum: 1 } } },
    { $match: { count: 2 } },
    { $project: { _id: 1 } },
  ], //{ "result" : [ { "_id" : 3 } ], "ok" : 1 }
  [
    { $match: { _id: { $in: [1, 3] } } },
    { $unwind: '$friends' },
    { $group: { _id: '$friends', count: { $sum: 1 } } },
    { $match: { count: 2 } },
    { $project: { _id: 1 } },
  ], //{ "result" : [ { "_id" : 4 }, { "_id" : 2 } ], "ok" : 1 }
  [
    { $match: { _id: { $in: [1, 4] } } },
    { $unwind: '$friends' },
    { $group: { _id: '$friends', count: { $sum: 1 } } },
    { $match: { count: 2 } },
    { $project: { _id: 1 } },
  ], //{ "result" : [ { "_id" : 3 } ], "ok" : 1 }
  [
    { $match: { _id: { $in: [1, 5] } } },
    { $unwind: '$friends' },
    { $group: { _id: '$friends', count: { $sum: 1 } } },
    { $match: { count: 2 } },
    { $project: { _id: 1 } },
  ], //{ "result" : [ { "_id" : 4 }, { "_id" : 3 }, { "_id" : 2 } ], "ok" : 1 }
  [
    { $match: { _id: { $in: [2, 4] } } },
    { $unwind: '$friends' },
    { $group: { _id: '$friends', count: { $sum: 1 } } },
    { $match: { count: 2 } },
    { $project: { _id: 1 } },
  ], //{ "result" : [ { "_id" : 5 }, { "_id" : 3 }, { "_id" : 1 } ], "ok" : 1 }
  [
    { $match: { _id: { $in: [1, 2, 3] } } },
    { $unwind: '$friends' },
    { $group: { _id: '$friends', count: { $sum: 1 } } },
    { $match: { count: 3 } },
    { $project: { _id: 1 } },
  ], //{ "result" : [ ], "ok" : 1 }  // have no friends in common.
  [
    { $match: { _id: { $in: [1, 2, 4] } } },
    { $unwind: '$friends' },
    { $group: { _id: '$friends', count: { $sum: 1 } } },
    { $match: { count: 3 } },
    { $project: { _id: 1 } },
  ], //{ "result" : [ { "_id" : 3 } ], "ok" : 1 } // have one friend in common: user 3
];

const otherJson = `
> db.friendships.insert([
	{ "_id" : "1|2", "u" : [1, 2] },
	{ "_id" : "1|3", "u" : [1, 3] },
	{ "_id" : "1|4", "u" : [1, 4] },

  { "_id" : "1|2", "u" : [2, 1] }, // omit -- id exists above
  { "_id" : "2|3", "u" : [2, 3] },
	{ "_id" : "2|5", "u" : [2, 5] },

  { "_id" : "1|3", "u" : [3, 1] }, // omit -- id exists above
  { "_id" : "2|3", "u" : [3, 2] }, // omit -- id exists above
	{ "_id" : "3|4", "u" : [3, 4] },
	{ "_id" : "3|5", "u" : [3, 5] },

  { "_id" : "1|4", "u" : [4, 1] }, // omit -- id exists above
  { "_id" : "3|4", "u" : [4, 3] }, // omit -- id exists above
	{ "_id" : "4|5", "u" : [4, 5] },

  { "_id" : "2|5", "u" : [5, 2] }, // omit -- id exists above
  { "_id" : "3|5", "u" : [5, 3] }, // omit -- id exists above
  { "_id" : "4|4", "u" : [5, 4] }, // omit -- id exists above
])
`; //db.friendships.insert

const otherAggregate = [
  [
    { $match: { u: { $in: [1, 2] } } },
    { $project: { _id: 0, u: 1 } },
    { $unwind: '$u' },
    { $match: { u: { $nin: [1, 2] } } },
    { $group: { _id: '$u', count: { $sum: 1 } } },
    { $match: { count: 2 } },
    { $project: { _id: 1 } },
  ], //{ "result" : [ { "_id" : 3 } ], "ok" : 1 }
  [
    { $match: { u: { $in: [1, 3] } } },
    { $project: { _id: 0, u: 1 } },
    { $unwind: '$u' },
    { $match: { u: { $nin: [1, 3] } } },
    { $group: { _id: '$u', count: { $sum: 1 } } },
    { $match: { count: 2 } },
    { $project: { _id: 1 } },
  ], //{ "result" : [ { "_id" : 4 }, { "_id" : 2 } ], "ok" : 1 }
  [
    { $match: { u: { $in: [1, 4] } } },
    { $project: { _id: 0, u: 1 } },
    { $unwind: '$u' },
    { $match: { u: { $nin: [1, 4] } } },
    { $group: { _id: '$u', count: { $sum: 1 } } },
    { $match: { count: 2 } },
    { $project: { _id: 1 } },
  ], //{ "result" : [ { "_id" : 3 } ], "ok" : 1 }
  [
    { $match: { u: { $in: [1, 5] } } },
    { $project: { _id: 0, u: 1 } },
    { $unwind: '$u' },
    { $match: { u: { $nin: [1, 5] } } },
    { $group: { _id: '$u', count: { $sum: 1 } } },
    { $match: { count: 2 } },
    { $project: { _id: 1 } },
  ], //{ "result" : [ { "_id" : 4 }, { "_id" : 3 }, { "_id" : 2 } ], "ok" : 1 }
  [
    { $match: { u: { $in: [2, 4] } } },
    { $project: { _id: 0, u: 1 } },
    { $unwind: '$u' },
    { $match: { u: { $nin: [2, 4] } } },
    { $group: { _id: '$u', count: { $sum: 1 } } },
    { $match: { count: 2 } },
    { $project: { _id: 1 } },
  ], //{ "result" : [ { "_id" : 5 }, { "_id" : 3 }, { "_id" : 1 } ], "ok" : 1 }
  [
    { $match: { u: { $in: [1, 2, 3] } } },
    { $project: { _id: 0, u: 1 } },
    { $unwind: '$u' },
    { $match: { u: { $nin: [1, 2, 3] } } },
    { $group: { _id: '$u', count: { $sum: 1 } } },
    { $match: { count: [1, 2, 3].length } },
    { $project: { _id: 1 } },
  ], //{ "result" : [ ], "ok" : 1 }  // have no friends in common.
  [
    { $match: { u: { $in: [1, 2, 4] } } },
    { $project: { _id: 0, u: 1 } },
    { $unwind: '$u' },
    { $match: { u: { $nin: [1, 2, 4] } } },
    { $group: { _id: '$u', count: { $sum: 1 } } },
    { $match: { count: [1, 2, 4].length } },
    { $project: { _id: 1 } },
  ], //{ "result" : [ { "_id" : 3 } ], "ok" : 1 } // have one friend in common: user 3
];
