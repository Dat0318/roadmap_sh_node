const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const urlMetadata = require('url-metadata');
const Meta = require('html-metadata-parser');
const _CONST = require('./app/config/constant.js');
const DB_MONGO = require('./app/config/db.config');
const app = express();

urlMetadata('https://fb.com').then(async (metadata) => {
  console.log(JSON.stringify(metadata, '*****', 2));
});

(async () => {
  var result = await Meta.parser('https://fb.com');

  console.log(JSON.stringify(result, null, 2));
})();

var corsOptions = {
  origin: 'http://localhost:8081', // co thể sau này nó là resfult api, cứ để sẵn
};
app.use(morgan('combined')); //theo dõi log GET, POST...

app.use(cors(corsOptions)); //cross domain...

app.use(express.static('public', { extensions: ['jsx'] }));
app.set('view engine', 'ejs');

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

connect(); //Connect to Mongodb
function isOkay() {
  console.log('connect to mongodb is OKay'); // check mongodb có kết nối thành công hay không
}

function connect() {
  mongoose.connection.on('error', console.log).on('disconnected', connect).once('open', isOkay);
  return mongoose.connect(DB_MONGO.url, { keepAlive: 1, useNewUrlParser: true });
}

require('./app/routes/')(app); //importing route

const PORT = process.env.PORT || _CONST.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
