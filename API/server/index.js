const URL =
  'mongodb+srv://bshrestha:03Md5BsmF2IiCGO9@cluster0.fm67amd.mongodb.net/issue_tracker';

const express = require('express');
const mongoose = require('mongoose');
const { installHandler } = require('./api_handler');

const PORT = 4000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.set('strictQuery', false);
mongoose.connect(URL, { useNewUrlParser: true });
installHandler(app);

(async function start() {
  try {
    // await seedData();
    app.listen(PORT, () => {
      console.log('App started on port 4000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}());
