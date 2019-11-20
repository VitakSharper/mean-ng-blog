const express = require('express');
const {getPost, getPosts, createPost, delPost, updatePost} = require('../controlers/postController');
const {protect} = require('../controlers/authController');
const multer = require('multer');
const {storage} = require('../utils/multerStorage');

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, multer({storage: storage}).single('image'), createPost);

router.route('/:id')
  .get(getPost)
  .patch(protect, multer({storage: storage}).single('image'), updatePost)
  .delete(protect, delPost);

module.exports = router;
