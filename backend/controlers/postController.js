const Post = require('../models/post');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().select('-__v');
    res.status(200).json({
      status: 'success',
      results: posts.length,
      posts
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).select('-__v');
    res.status(200).json({
      status: 'success',
      post
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json({
      status: 201,
      post
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: 200,
      post
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e
    });
  }
};

exports.delPost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e
    });
  }
};
