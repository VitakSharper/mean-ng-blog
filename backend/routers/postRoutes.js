const express = require('express');
const {getPost, getPosts, createPost, delPost, updatePost} = require('../controlers/postController');
const multer = require('multer');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    MIME_TYPE_MAP[file.mimetype] ? cb(null, 'backend/images') : cb(new Error(`Invalid mime type ${file.mimetype}`), 'backend/images');
  },
  filename: (req, file, cb) => {
    console.log('In Storage filename: ', MIME_TYPE_MAP[file.mimetype]);
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, `${name}-${Date.now()}.${ext}`);
  }
});

router.route('/')
  .get(getPosts)
  .post(multer({storage: storage}).single('image'), createPost);

router.route('/:id')
  .get(getPost)
  .patch(updatePost)
  .delete(delPost);

module.exports = router;
