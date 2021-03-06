const {promisify} = require('util');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('./../models/user');

const signToken = id => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const {email, password} = req.body;
  // Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide emeil and password!', 400));
  }
  // Check if user exists && password is correct
  const user = await User.findOne({email}).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  // If everything ok , send token to client
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else {
    return next(new AppError('Your are not logged in!'))
  }
  const decodedT = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decodedT.id);
  if (!currentUser) {
    return next(new AppError('User no longer exist.'))
  }
  if (currentUser.changedPasswordAfter(decodedT.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }
  req.user = currentUser;
  next();
});

const createSendToken = (user, statusCode, res) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV === 'production',
    // prevent cross site scripting attacks
    httpOnly: true
  };

  const token = signToken(user.id);

  res.cookie('jwt', token, cookieOptions);
  // remove password from the output
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};
