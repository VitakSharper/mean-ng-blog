const Post = require('../models/post');
const catchAsync = require('../utils/catchAsync');

// Route Handlers
exports.getPosts = catchAsync(async (req, res) => {
  const posts = await Post.find().sort('-updatedAt').select('-__v');
  res.status(200).json({
    status: 'success',
    results: posts.length,
    posts
  });
});

exports.getPost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.id).select('-__v');
  res.status(200).json({
    status: 'success',
    post
  });
});

exports.createPost = catchAsync(async (req, res) => {
  const imgUrl = `${req.protocol}://${req.get('host')}`;
  const post = await Post.create({...req.body, imagePath: `${imgUrl}/images/${req.file.filename}`});
  res.status(201).json({
    status: 201,
    post
  });
});

exports.updatePost = catchAsync(async (req, res) => {
  let imagePath;
  if (req.file) {
    const imgUrl = `${req.protocol}://${req.get('host')}`;
    imagePath = `${imgUrl}/images/${req.file.filename}`;
  } else {
    imagePath = req.body.image;
  }
  const post = await Post.findByIdAndUpdate(req.params.id, {
    ...req.body,
    imagePath
  });
  res.status(200).json({
    status: 200,
    post
  });
});

exports.delPost = catchAsync(async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
  });
});
