const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRouter = require('../backend/routers/postRoutes');

const app = express();

app.use(express.json());

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log('Connected to Db')
  } catch (e) {
    console.log('Error connection to the Db !', e)
  }
};
connectDb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  next()
});


app.use('/api/v1/posts', postRouter);
module.exports = app;
