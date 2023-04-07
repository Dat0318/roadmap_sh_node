import PassportJWT from 'passport-jwt';
import config from './index.js';
import models from '@BudgetManager/app/setup';

const ExtractJWT = PassportJWT.ExtractJwt,
  Strategy = PassportJWT.Strategy;

module.exports = (passport) => {
  const User = models.User;
  const parameters = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  };
  passport.use(
    new Strategy(parameters, (payload, done) => {
      User.findOne({ id: payload.id }, (error, user) => {
        if (error) return done(error, false);
        if (user) done(null, user);
        else done(null, false);
      });
    })
  );
};
