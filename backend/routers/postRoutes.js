const express = require('express');
const {getPost, getPosts, createPost, delPost} = require('../controlers/postController');

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(createPost);

router.route('/:id')
  .get(getPost)
  .delete(delPost);

module.exports = router;
