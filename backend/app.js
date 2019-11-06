const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const Post = require('./models/post');

mongoose.connect('mongodb+srv://TestUser:TestUser@cluster0-ztu6t.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to Db')
  }).catch(() => {
  console.log('Error connection to the Db !')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  next()
});

const posts = [
  {
    id: 'fsdfsd445',
    title: 'some title',
    content: 'some content'
  },
  {
    id: 'fsdfsd446',
    title: 'some second title',
    content: 'some second content'
  }
];

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  console.log('Posts: ', post);
  posts.push(post);

  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  res.status(200).json({
    message: 'Posts fetched successfully!',
    posts
  });
});

module.exports = app;
