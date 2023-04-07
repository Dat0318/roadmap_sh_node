import axios from 'axios';
import curlirize from 'axios-curlirize';
curlirize(axios);

const run = async () => {
  const cal = '( √ wight + 2 * number ) / total',
    define_key = {};
  //a*b/100 + 1 => 100 => 0 else 50
  // ((item.wight * item.number) / 100 + 1 ) >= 100

  const item = {
    wight: 16,
    number: 3,
    total: 2,
  };
  // eval("var fn = function(item){ return ((item.wight * item.number) / 100 + 1 ) >= 100; }");
  // fn(item);
  var fn = new Function('item', 'var a = ((item.wight * item.number) / 100 + 1 ); console.log(a)');
  fn(item);

  // const host = 'https://vinhomes.vn',
  //   url = 'https://vinhomes.vn/vi/khach-hang-xieu-long-khi-tham-du-tiec-tra-dam-chat-nhat-tai-vinhomes-grand-park#abc';
  // const res = await axios.get('https://dummyjson.com/products/1');
  // try {
  //   const { status, data, headers, config } = await axios.get(url);
  // } catch (err) {
  //   const res = err.response.data;
  //   // var object = res.match(/window._cf_chl_opt=.*};/gms)[0].split('').reduce((init, val, i, arr) => {
  //   //     if (val === ';') arr.splice(1);
  //   //     init += val;
  //   //     return init;
  //   //   }, '').replace('window._cf_chl_opt=', '');

  //   var text = res
  //     .match(/cUPMDTk: ".*",/gms)[0]
  //     .replace('cUPMDTk: "', '')
  //     .replaceAll('\\', '')
  //     .replace('",', ''), hash = url.match(/#.*/gms)[0];
  //   const { status, data, headers, config } = await axios.get(host + text + hash);
  // }
};

run();
