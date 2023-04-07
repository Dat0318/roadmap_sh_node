var fs = require('fs');
var stream, stream_1;
stream = fs.createReadStream('D://data.txt');
stream_1 = fs.createWriteStream("D://data.txt");

stream.on('data', function (data) {
  var chunk = data.toString();
  console.log(chunk);
});

stream_1.write('Tutorial on Node.js');
stream_1.write('Introduction');
stream_1.write('Events');
stream_1.write('Generators');
stream_1.write('Data Connectivity');
stream_1.write('Using Jasmine');

function* Add(x) {
  yield x + 1;
  var y = yield null;
  y = 6;
  return x + y;
}

var gen = Add(5);
gen.next();
gen.next();

function* Messages() {
  console, log(yield Timedelay(1000, function () {}));
  console, log(yield Timedelay(2000, function () {}));
  console, log(yield Timedelay(3000, function () {}));
}
