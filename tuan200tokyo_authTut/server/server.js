//npm modules
// ./node_modules/nodemon/bin/nodemon.js --ignore sessions tuan200tokyo_authTut/server/server.js

import express from 'express';
import { v4 as uuid } from 'uuid';
import session from 'express-session';
import sessionStore from 'session-file-store';
import bodyParser from 'body-parser';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import axios from 'axios';
import bcrypt from 'bcrypt-nodejs';

const users = [{ id: '2f24vvg', email: 'test@test.com', password: 'password' }];

//configure passport.js to use the local strategy
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    // console.log('Inside local strategy callback');
    // here is where you make a call to the database, to find the user based on
    // their username or email address for now, we'll just pretend we found that it was users[0]
    // const user = users[0];
    // if (email === user.email && password === user.password) {
    //   console.log('Local strategy returned true');
    //   return done(null, user);
    // }
    axios
      .get(`http://localhost:5000/users?email=${email}`)
      .then((res) => {
        const user = res.data[0];
        if (!user) {
          return done(null, false, { message: 'Invalid credentials.\n' });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: 'Invalid credentials.\n' });
        }
        return done(null, user);
      })
      .catch((error) => done(error));
  })
);

//tell passport how to serialize the user
passport.serializeUser((user, done) => {
  console.log('Inside serializeUser callback. User id is save to the session file store here');
  done(null, user.id);
});

//tell passport how to serialize the user
passport.serializeUser((user, done) => {
  // console.log('Inside serializeUser callback. User id is save to the session file store here');
  // done(null, user.id);

  axios
    .get(`http://localhost:5000/users/${id}`)
    .then((res) => done(null, res.data))
    .catch((error) => done(error, false));
});

const app = express(),
  port = process.env.PORT || 3001,
  FileStore = sessionStore(session);

app.set('views', './tuan200tokyo_authTut/views');
app.set('view engine', 'pug');

// add & configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    genid: (req) => uuid(), // use UUIDs for session IDs
    store: new FileStore(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// create the homepage route at '/'
app.get('/', (req, res) => {
  res.send(`You hit home page! ${req.sessionID}\n`);
});

//create the login get and post routes
app.get('/login', (req, res) => {
  console.log('Inside GET /login callback');
  console.log(req.sessionID);
  res.send(`You got the login page!\n`);
});

app.post('/login', (req, res, next) => {
  console.log('Inside GET /login callback function', req.sessionID);
  passport.authenticate('local', (err, user, info) => {
    console.log('Inside passport.authenticate() callback');
    console.log(`req.session.passport:${JSON.stringify(req.session.passport)}`);
    console.log(`req.user:${JSON.stringify(req.user)}`);
    req.login(user, (err) => {
      console.log('Inside req.login() callback');
      console.log(`req.session.passport:${JSON.stringify(req.session.passport)}`);
      console.log(`req.user:${JSON.stringify(req.user)}`);
      return res.send('You were authenticated & logged in!\n');
    });
  })(req, res, next);
});

app.get('/authrequired', (req, res) => {
  console.log('Inside GET /authrequired callback');
  console.log(`User authenticated? ${req.isAuthenticated()}`);
  if (req.isAuthenticated()) {
    res.send('you hit the authentication endpoint\n');
  } else {
    res.redirect('/');
  }
});

app.listen(port, () => console.log(`Listening on localhost:${port}`));
