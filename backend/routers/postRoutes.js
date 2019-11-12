const express = require('express');
const {getPost, getPosts, createPost, delPost, updatePost} = require('../controlers/postController');

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(createPost);

router.route('/:id')
  .get(getPost)
  .patch(updatePost)
  .delete(delPost);

module.exports = router;
