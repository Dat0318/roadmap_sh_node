import mongoose from 'mongoose';
import UserModel from '@BudgetManagerModels/user';

const models = {
  User: mongoose.model('User'),
};
module.exports = models;
