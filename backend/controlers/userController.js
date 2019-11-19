const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/user');

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find()
    .select('-__v')
    .select('+password')
  res.status(200).json({
    status: 'success',
    data: {
      users
    }
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  if (!(await User.findByIdAndDelete(req.params.id))) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(204).json({
    status: 'success'
  });
});
