const express = require('express');
const {getPost, getPosts, createPost, delPost, updatePost} = require('../controlers/postController');
const multer = require('multer');
const {storage} = require('../utils/multerStorage');

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(multer({storage: storage}).single('image'), createPost);

router.route('/:id')
  .get(getPost)
  .patch(multer({storage: storage}).single('image'),updatePost)
  .delete(delPost);

module.exports = router;
