const http = require('http');
const path = require('path');
const express = require('express');
const winston = require('winston');
const { Writable } = require('stream');
const app = express(),
  port = 3000;

const stream = new Writable({
  objectMode: false,
  write: (raw) => console.log('<<< START SERVER >>>', raw.toString()),
});

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint(),
    winston.format.label({ label: 'right meow!' }),
    winston.format.printf(
      (info) => `[server started]: ${info.timestamp}:${info.label}:${info.message}`
    )
  ),
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: 'info.log',
      maxsize: 1024 * 1024 * 5,
      format: winston.format.printf(
        (info) => `[do whatever you want] ${info.timestamp}:${info.label}:${info.message}`
      ),
    }),
    new winston.transports.Console(),
    new winston.transports.Stream({ stream }),
    new winston.transports.Http({ host: 'localhost', port: 8080 }),
  ],
});

http
  .createServer((req, res) => {
    const arr = [];
    req
      .on('data', (chunk) => arr.push(chunk))
      .on('end', () => {
        const msg = Buffer.concat(arr).toString();
        console.log('http msg', msg);
        res.end(msg);
      });
  })
  .listen(8080);

logger.info('winston transports');

app.get('/', (req, res) => {
  logger.info('Chung no dang reload lien tuc');
  res.send('Hello World!');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
