import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import fs from 'fs';

const hostname = '127.0.0.1',
  port = process.env.PORT || 3000,
  app = express();

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

// import Auth from './src/auth.js';
// import { Logger } from './src/logger.js';
// import got from 'got';
// import jwt from 'jsonwebtoken';
// var token = jwt.sign({ foo: 'bar' }, 'VKVSDKNBSLDBSKDBMSOBJS153VSDB5S6B1S31B5S3DB');
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: err });
});

app.use(function (req, res, next) {
  function afterResponse() {
    res.removeListener('finish', afterResponse);
    res.removeListener('close', afterResponse);
  }
  res.on('finish', afterResponse);
  res.on('close', afterResponse);
  next();
});

app.get('/names/:name', function (req, res, next) {
  if (req.params.name == 'john') {
    return res.send('Valid Name');
  } else {
    next(new Error('Not valid name'));
  }
});

app.use(function (err, req, res, next) {
  console.log(err.stack);
  return res.status(500).send('Internal Server Occured');
});

app.get('/setcookie', function (req, res) {
  res.cookie('username', 'john doe', { maxAge: 900000, httpOnly: true });
  return res.send('Cookie has been set');
});

app.get('/getcookie', function (req, res) {
  var username = req.cookies['username'];
  if (username) {
    return res.send(username);
  }
  return res.send('No cookie found');
});

app.get('/api', function (req, res, next) {
  lookupMember(function (err, member) {
    if (err) return next(err);
    req.member = member;
    next();
  });
});

app.get('/api/foo', function (req, res, next) {
  doSomethingWithMember(req.member);
});

app.get('/api/bar', function (req, res, next) {
  doSomethingDifferentWithMember(req.member);
});

app.get(
  '/bananas',
  function (req, res, next) {
    getMember(function (err, member) {
      if (err) return next(err);
      if (!member) return next('route');
      req.member = member;
      next();
    });
  },
  function (req, res, next) {
    getMemberData(req.member, function (err, data) {
      if (err) return next(err);
      if (!data) return next('route');
      req.member.data = data;
      next();
    });
  },
  function (req, res, next) {
    req.member.parsedData = parseMemberData(req.member.data);
    next();
  }
);

app.get('/bananas', function (req, res, next) {
  renderBananas(req.member);
});

app.get('/path/:id(\\d+)', function (req, res, next) {
  if (req.params.id == 0) return next(new Error('Id is 0'));

  var data;
  try {
    data = JSON.parse('/file.json');
  } catch (err) {
    return next(err);
  }

  if (!data) throw new Error('Smth wrong');
  if (smth) next(new MyError('smth wrong', arg1, arg2));

  res.status(200).end('OK');
});

app.use(function (err, req, res, next) {
  if ((smth - check, e.g.req.url != 'POST')) return next(err);
  console.log(req.url, err.message);

  if (req.xhr) res.json(err);
  else res.render('error.html', { error: err.message });
});

app.use(function (err, req, res, next) {
  if (err instanceof MyError) {
    console.log(err.message, err.arg1, err.arg2);
  }
  res.end();
});

app.use(function (req, res, next) {
  next(new Error(404));
});

app.post('/post-data-here', function (req, res, next) {
  console.log(req.body);
});

// fs.readFile('/tmp/hello.txt', { encoding: 'utf8' }, (err, content) => {
//   if (!!err) {
//     console.error(err.message);
//     return;
//   }
// });
// fs.readFile('binary', (err, binaryContent) => {
//   if(err) return console.error(err.message);
//   console.log(content.toString('hex'));
// });

app.listen(port);
