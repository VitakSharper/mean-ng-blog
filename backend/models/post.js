const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {
    type: String,
    require: [true, 'A post must have a title!'],
    trim: true
  },
  content: {
    type: String,
    require: [true, 'A post must have a content!'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
