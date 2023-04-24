// openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
// pass cert: 123456
// ./node_modules/nodemon/bin/nodemon.js free_code_camp/index.js

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import cors from 'cors';
import csrf from 'csurf';
import http from 'http';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from 'morgan';
import express from 'express';
import slowDown from 'express-slow-down';
import rateLimit from 'express-rate-limit';
import routers from './router/index.js';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import helmet from 'helmet';
import expressWaf from 'express-waf'; // web application firewalls
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
// const redisClient = createClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const emudb = new expressWaf.EmulatedDB();
const waf = new expressWaf.ExpressWaf({
  blocker: {
    db: emudb,
    blockTime: 1000,
  },
  log: true,
  mode: 'blocking',
  ruleSets: {
    owasp: true,
    custom: [
      {
        id: '1001',
        message: 'Custom rule: Block requestswith User-Agent "BadBot"',
        regex: /BadBot/i,
        target: 'headers',
        action: 'block',
      },
    ],
  },
});
const options = {
  key: fs.readFileSync(__dirname + '/cert/key.pem', 'utf8'),
  cert: fs.readFileSync(__dirname + '/cert/cert.pem', 'utf8'),
  passphrase: '123456',
};

app.use(cors());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(
  slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: 100, // allow 100 requests per 15 minutes, then...
    delayMs: 500, // begin adding 500ms of delay per request above 100
  })
);
app.use(helmet());
app.use(logger('dev'));
// app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(csrf({ cookie: true }));

app.set('views', './free_code_camp/views');
app.set('view engine', 'pug');
// connect redis in client and test
// redisClient.connect().catch(console.error);
app.use(
  session({
    // store: new RedisStore({ client: redisClient, prefix: 'myapp:' }),
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true, // Use HTTPS
      httpOnly: true, // Prevent XSS attacks
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // Set session expiration (e.g., 24 hours)
    },
  })
);
// app.use(waf.check); // Use express-waf middleware

// Protected routes
app.use('/auth', routers.auth);
app.use('/upload', routers.upload);
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});

// app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

https
  .createServer(options, app)
  .listen(port, () => console.log(`Server running at https://localhost:${port}`));

// HTTP SERVER
const httpApp = express();
httpApp.use(bodyParser.json());
httpApp.use(bodyParser.urlencoded({ extended: false }));
httpApp.use((req, res, next) => {
  // res.redirect(`https://${req.headers.host}${req.url}`);
  res.redirect(`https://localhost:3000${req.url}`);
});

http
  .createServer(httpApp)
  .listen(Number(port) + 1, () =>
    console.log(`HTTP server redirecting to HTTPS at http://localhost:${Number(port) + 1}`)
  );
