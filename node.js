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
