const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const pe = require('parse-error');
const cors = require('cors');

const v1 = require('./routes/v1');
const app = express();

const CONFIG = require('./config/config');
const models = require('./models');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use('/v1', v1);
app.use(passport.initialize());

app.use('/', function (req, res) {
  res.statusCode = 200; //send the appropriate status code
  res.json({ status: 'success', message: 'Parcel Pending API', data: {} });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

models.sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to SQL database:', CONFIG.db_name);
  })
  .catch((err) => {
    console.error('Unable to connect to SQL database:', CONFIG.db_name);
  });
if (CONFIG.app === 'dev') {
  models.sequelize.sync();
  // models.sequelize.sync({ force: true });
}

process.on('unhandledRejection', (error) => {
  console.error('Uncaught Error', pe(error));
});

module.exports = app;
