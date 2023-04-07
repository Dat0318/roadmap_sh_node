import cors from 'cors';
import consign from 'consign';
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import mongoose from 'mongoose';
import config from './index.js';
import bodyParser from 'body-parser';

const passportConfig = import('./passport').then((m) => m(passport)),
  database = import('./database').then((m) => m(mongoose, config));

const app = express();

app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());
app.set('budgetsecret', config.secret);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
