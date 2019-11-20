const express = require('express');
const {createUser, updateUser, getUsers, getUser, deleteUser} = require('./../controlers/userController');
const {login, signup, protect} = require('./../controlers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);


router
  .route('/')
  .get(getUsers)
  .post(protect, createUser);

router
  .route('/:id')
  .get(getUser)
  .patch(protect, updateUser)
  .delete(protect, deleteUser);

module.exports = router;
