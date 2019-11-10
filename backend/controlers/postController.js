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
  } catch (e) {

  }
};

exports.createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json({
      status: 201,
      newPost
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e
    });
  }
};
