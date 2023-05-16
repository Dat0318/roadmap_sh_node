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
  https://kipalog.kaopiz.com/posts/Upload-Large-File-to-AWS-S3-with-Multipart--Presignurl-from-Clientside
  https://kipalog.kaopiz.com/posts/Multiple-file-upload-into-Amazon-s3-bucket
  https://kipalog.kaopiz.com/posts/Kinh-nghiem-thiet-ke-luong-xu-ly-cho-cac-chuc-nang-thanh-toan-credit-card---apple-pay
  https://kipalog.kaopiz.com/posts/Hay-tin-minh--Tu-tin-dang-ki-thi-FE---
  https://kipalog.kaopiz.com/posts/Tang-ban-10-bo-UI-mien-phi-de-tang-toc-qua-trinh-thiet-ke
  https://kipalog.kaopiz.com/posts/Scope-Creep---Qua-cau-tuyet
  https://kipalog.kaopiz.com/posts/Laravel-Model-Events
  https://kipalog.kaopiz.com/posts/ISO--Duoc-va-mat-voi-quy-trinh
  https://kipalog.kaopiz.com/posts/Nay-anh-ban-Lap-trinh-vien--neu-muon-len-trinh-thi-hay-viet-code-cho-sach
  https://kipalog.kaopiz.com/posts/Authorization-trong-Laravel
  https://kipalog.kaopiz.com/posts/Da-ngon-ngu-trong-Laravel
  https://kipalog.kaopiz.com/posts/Tu-tao-php-console-app-Artisan-giong-Laravel
  https://kipalog.kaopiz.com/posts/Cac-mo-hinh-database-nen-biet
  https://kipalog.kaopiz.com/posts/Laravel-Mix-without-Laravel
  https://kipalog.kaopiz.com/posts/Validation-trong-Laravel
  https://kipalog.kaopiz.com/posts/Design-Patterns-la-gi
  `;

  const arr = links
    .split('\n')
    .map((ele) => ele.replace(' ', ''))
    .filter((ele) => !!ele.trim());

  arr.forEach((ele) => window.open(ele));
};

openLinks();
