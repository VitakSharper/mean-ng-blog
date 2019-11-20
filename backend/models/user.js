const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please tell us your Name!']
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Please provide your E-mail!'],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid E-mail!']
  },
  photo: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Please provide a password!'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    trim: true,
    required: [true, 'Please confirm you provided password!'],
    minlength: 8,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password are not the same!'
    }
  },
  passwordChangedAt: {
    type: Date
  }
});

schema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

schema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

schema.methods.changedPasswordAfter = function (iat) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return iat < changedTimeStamp;
  }
  // False means password was not changed
  return false;
};

const User = mongoose.model('User', schema);
module.exports = User;
