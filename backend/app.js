const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRouter = require('../backend/routers/postRoutes');

const app = express();

app.use(express.json());

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
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

// app.post('/api/v1/posts', (req, res, next) => {
//   const post = new Post({
//     title: req.body.title,
//     content: req.body.content
//   });
//   post.save();
//   console.log('Posts: ', post);
//   posts.push(post);
//
//   res.status(201).json({
//     message: 'Post added successfully'
//   });
// });
//
// app.get('/api/posts', (req, res, next) => {
//   res.status(200).json({
//     message: 'Posts fetched successfully!',
//     posts
//   });
// });
app.use('/api/v1/posts', postRouter);
module.exports = app;
