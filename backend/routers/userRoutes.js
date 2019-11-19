const express = require('express');
const {createUser, updateUser, getUsers, getUser, deleteUser} = require('./../controlers/userController');
const {login, signup} = require('./../controlers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);


router
  .route('/')
  .get(getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
