const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
    trim: true
  },
  content: {
    type: String,
    require: true,
    trim: true
  }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
