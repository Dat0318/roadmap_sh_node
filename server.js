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

const weatherApp = () => {
  // class WeatherData {
  //   constructor(temperature, humidity, pressure) {
  //     this.temperature = temperature;
  //     this.humidity = humidity;
  //     this.pressure = pressure;
  //   }
  // }

  // class WeatherDisplay {
  //   display(weatherData) {
  //     console.log(`Temperature: ${weatherData.temperature}`);
  //     console.log(`Humidity: ${weatherData.humidity}`);
  //     console.log(`Pressure: ${weatherData.pressure}`);
  //   }
  // }

  // class WindDisplay {
  //   display(weatherData) {
  //     console.log(`Wind speed: ${weatherData.windSpeed}`);
  //     console.log(`Wind direction: ${weatherData.windDirection}`);
  //   }
  // }

  // class WeatherApp {
  //   weatherData;
  //   weatherDisplay;
  //   windDisplay;
  //   constructor(weatherData) {
  //     this.weatherData = weatherData;
  //     this.weatherDisplay = new WeatherDisplay();
  //     this.windDisplay = new WindDisplay();
  //   }

  //   displayWeather() {
  //     this.weatherDisplay.display(this.weatherData);
  //     this.windDisplay.display(this.weatherData);
  //   }
  // }

  // const weatherData = new WeatherData(72, 50, 1013);
  // weatherData.windSpeed = 5;
  // weatherData.windDirection = 'NW';
  // const weatherApp = new WeatherApp(weatherData);
  // weatherApp.displayWeather();

  // class Character {
  //   move() {
  //     console.log('Character moved');
  //   }
  // }

  // class Warrior extends Character {
  //   attack() {
  //     console.log('Warrior attacked');
  //   }
  // }

  // class Mage extends Character {
  //   castSpell() {
  //     console.log('Mage cast a spell');
  //   }
  // }

  // class Paladin extends Warrior {
  //   heal() {
  //     console.log('Paladin healed');
  //   }
  // }

  // const characters = [new Warrior(), new Mage(), new Paladin()];
  // for (let character of characters) {
  //   character.move();
  //   if (character instanceof Warrior) {
  //     character.attack();
  //   }
  //   if (character instanceof Mage) {
  //     character.castSpell();
  //   }
  //   if (character instanceof Paladin) {
  //     character.heal();
  //   }
  // }

  async function testAsync(v) {
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
    return v + 1;
  }

  const data = [];
  const params = [0, 1, 2];
  params.forEach(async (v) => {
    // this is a async function but parent function is not, it is a sync func
    const res = await testAsync(v);
    // console.log(res);
    data.push(res);
  });
  console.log(data);
};

const awaitForEach = async () => {
  const data = [];
  const params = [0, 1, 2];

  async function testAsync(v) {
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
    return v + 1;
  }

  for (const v of params) {
    const res = await testAsync(v);
    console.log(res);
    data.push(res);
  }
  console.log(data);

  const data_1 = await Promise.all(
    params.map(async (v) => {
      const res = await testAsync(v);
      return res;
    })
  );
  console.log(data_1);
};

// weatherApp();
// awaitForEach();
// run();

const openLinks = () => {
  const links = `
  https://viblo.asia/p/tai-sao-ban-nen-chon-typescript-thay-vi-javascript-EoW4oxYrJml
  https://viblo.asia/p/so-sanh-nho-giua-typescript-va-javascript-aAY4qvnDJPw
  https://viblo.asia/p/toi-viet-cai-package-atltvenv-nhu-the-nao-phan-2-obA4630BJKv
  https://viblo.asia/p/typescript-utility-types-pho-bien-018J29Ee4YK
  https://viblo.asia/p/hieu-ve-khai-niem-the-constructor-of-the-class-trong-typescript-AZoJjXAOVY7
  https://viblo.asia/p/generics-trong-typescript-WR5JRmOz4Gv
  https://viblo.asia/p/tich-hop-redux-toolkit-vao-react-voi-typescript-r1QLxQDgVAw
  https://viblo.asia/p/chuyen-type-tu-json-sau-khi-fetch-api-5OXLAoxv4Gr
  https://viblo.asia/p/xu-ly-request-va-refresh-token-hieu-qua-trong-react-js-voi-axios-interceptors-gwd43kXK4X9
  https://viblo.asia/p/cach-dang-nhap-sso-keycloak-voi-reactjs-va-typescript-38X4E52j4N2
  https://viblo.asia/p/tao-rest-api-tren-nodejs-voi-express-va-prisma-su-dung-typescript-naQZRPnj5vx
  https://viblo.asia/p/interface-funtion-trong-typescript-p1-OeVKBjyEKkW
  https://viblo.asia/p/modules-trong-typescript-Qpmlez3k5rd
  https://viblo.asia/p/dependency-injection-trong-typescript-aWj53m1eZ6m
  `;

  const arr = links
    .split('\n')
    .map((ele) => ele.replace(' ', ''))
    .filter((ele) => !!ele.trim());

  arr.forEach((ele) => window.open(ele));
};

openLinks();
