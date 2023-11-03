// ABSTRACT FACTORY PATTERN

abstract class VIN {
  abstract run(): void;
}

class LUXA20 extends VIN {
  run(): void {
    console.log('LUXA20 Ô tô');
  }
}

class LUXSA20 extends VIN {
  run(): void {
    console.log('LUXSA20 Ô tô');
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

const vinFactory = new ConcreteVINFactory();
const luxA20 = vinFactory.produceLUXA20();
const luxSA20 = vinFactory.produceLUXSA20();
luxA20.run();
luxSA20.run();

// let Searcher = (() => {
//   let escapeReg = (reg) => reg.replace(/[\-#$\^*()+\[\]{}|\\,.?\s]/g, '\\$&'),
//     groupLeft = '',
//     groupRight = '',
//     groupReg = new RegExp(escapeReg(groupRight + groupLeft), 'g'),
//     groupExtractReg = new RegExp(
//       `(${escapeReg(groupLeft)}[\\s\\S]+?${escapeReg(groupRight)})`,
//       'g'
//     );
//   let findMax = (str, keyword) => {
//     let max = 0;
//     keyword = groupLeft + keyword + groupRight;
//     str.replace(groupExtractReg, (m) => {
//       if (keyword == m) {
//         max = Number.MAX_SAFE_INTEGER;
//       } else if (m.length > max) {
//         max = m.length;
//       }
//     });
//     return max;
//   };
//   let keyReg = (key) => {
//     let src = ['(.*?)('],
//       ks = key.split('');
//     if (ks.length) {
//       while (ks.length) {
//         src.push(escapeReg(ks.shift()), ')(.*?)(');
//       }
//       src.pop();
//     }
//     src.push(')(.*?)');
//     src = src.join('');
//     let reg = new RegExp(src, 'i'),
//       replacer = [],
//       start = key.length,
//       begin = 1;
//     while (start > 0) {
//       start--;
//       replacer.push('$', begin, groupLeft + '$', begin + 1, groupRight);
//       begin += 2;
//     }
//     replacer.push('$', begin);

//     return {
//       regexp: reg,
//       replacement: replacer.join(''),
//     };
//   };

//   return {
//     search(list, keyword) {
//       let kr = keyReg(keyword),
//         result = [];
//       for (let e of list) {
//         if (kr.regexp.test(e)) {
//           result.push(e.replace(kr.regexp, kr.replacement).replace(groupReg, ''));
//         }
//       }
//       result = result.sort((a, b) => findMax(b, keyword) - findMax(a, keyword));
//       console.log(`result::::`, result); //create div

//       return result.map((el) => `${el}`);
//     },
//   };
// })();
// // console.log(document.querySelectorAll('.search-prev'));
// //List demo
// let list = [
//   'javascript',
//   'es6',
//   'tipjs ',
//   'web_development ',
//   'nodejs ',
//   'object ',
//   'webdev ',
//   'lab-javascript ',
//   'async-await ',
//   'array ',
//   'tips and tricks javascript ',
//   'mongodb ',
//   'firebase ',
//   'promise ',
//   'auth02 ',
//   'authenticate token ',
//   'expressjs',
//   'token',
//   'jwt',
//   'cookie',
//   'series callback javascript',
//   'async',
//   'nginx',
//   'pattern',
//   'feature_javascript',
//   'reduce_javascript',
//   'build-project',
//   'exprejs',
//   'design_pattern',
//   'session',
//   'login',
//   'method',
//   'css',
//   'performance',
//   'jwt and restful api',
//   'es11',
//   'mongoose',
//   'newbie',
//   'array_javascript',
//   'data structures and algorithms',
//   'javascript',
//   'api',
//   'secure',
//   'module',
//   'rss_code',
//   'javascript_basic',
//   'object_assgin',
//   'spread_operator',
//   'javascript newbie',
//   'fireabse_notification',
//   'interview',
//   'query_javascript',
//   'callbacks',
//   'await',
//   'destructuring',
//   'redis',
//   'scope',
//   'jsonp',
//   'moment',
//   'transaction',
//   'cors',
//   'event_loop',
//   'npm',
//   'metadata',
//   'system',
//   'ebook',
//   'cluster',
//   'pm2',
//   'dom',
//   'hight-order-function',
//   'html',
//   'mysql',
//   'ffmpeg',
//   'verify-sms-firebase',
//   'mysql-nodejs',
//   'about performance javascript',
//   'reactjs',
//   'callback',
//   'basic',
//   'ajax',
//   'reduce',
//   'middleware',
//   'iterator',
//   'series es6 vs react',
//   'object_javascript',
//   'es5',
//   'refreshtoken',
//   'deep_copy_javascript',
//   'big-data',
//   'rss_new',
//   'http-status-code',
//   'medium',
//   'string',
//   'fetch',
//   'es12',
//   'tips_and_tricks',
//   'console',
//   'es10',
//   'cache_js',
//   'git',
//   'question',
//   'puppeteer',
// ];

// const divCon = document.getElementById('search-items'),
//   input = document.querySelector('input');

// input.addEventListener('keypress', (e) => {
//   divCon.innerHTML = '';
//   const rs = Searcher.search(list, e.target.value);
//   rs.forEach((el) => {
//     var div = document.createElement('div');
//     div.className = 'result';
//     div.innerHTML = el;
//     divCon.appendChild(div);
//   });
// });

// let html = `
//   <div class="search-box">
//     anonystick.com
//     <form no-validade>
//       <input
//         type="text"
//         text=""
//         tabindex="1"
//         class="enter-key"
//         onpropertychange="TextChange(this)"
//         placeholder="Search..."
//       />
//     </form>
//     <div
//       class="search-prev"
//       id="search-items"
//     />
//   </div>
// `;

// SKIP AND LIMIT
const arr = [
  { id: 1, name: 'king' },
  { id: 2, name: 'master' },
  { id: 3, name: 'lisa' },
  { id: 4, name: 'ion' },
  { id: 5, name: 'jim' },
  { id: 6, name: 'gowtham' },
  { id: 1, name: 'jam' },
  { id: 1, name: 'lol' },
  { id: 2, name: 'kwick' },
  { id: 3, name: 'april' },
  { id: 7, name: 'sss' },
  { id: 8, name: 'brace' },
  { id: 8, name: 'peiter' },
  { id: 5, name: 'hey' },
  { id: 6, name: 'mkl' },
  { id: 9, name: 'melast' },
  { id: 9, name: 'imlast' },
  { id: 10, name: 'glow' },
];
// console.log(arr.distinct(obj => obj.id))

var array_method = `
Array.prototype.distinct = function(selector){
  if (selector === 'undefined'){
    return [...new Set(this)];
  }

  if (typeof(selector) !== 'function'){
    throw new Error('Expecting selector to be a function, but received ' + typeof(selector) + ' instead.');
  }
  
  let found = new Set()
  return this.filter(element => {
    if (found.has(selector(element))){
      return false
    } else {
      found.add(selector(element))
      return true
    }
  })
}

function limit(c){
  return this.filter((x,i)=>{
      if(i<=(c-1)){return true}
  })
}

Array.prototype.limit = limit;

function skip(c){
  return this.filter((x,i)=>{
  if(i>(c-1)){return true}
  })
}

Array.prototype.skip = skip;
`;
