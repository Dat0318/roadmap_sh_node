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
