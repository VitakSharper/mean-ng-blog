const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRouter = require('../backend/routers/postRoutes');
const userRouter = require('../backend/routers/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controlers/errorController');

const app = express();

app.use(express.json());

(async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log('Connected to Db (❁´◡`❁) (●\'◡\'●)'
    )
  } catch (e) {
    console.log('Error connection to the Db ༼ つ ◕_◕ ༽つ !', e)
  }
})();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  next()
});


app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
});
app.use(globalErrorHandler);

module.exports = app;
