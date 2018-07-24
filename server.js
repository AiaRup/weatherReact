const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

mongoose.Promise = global.Promise;

// Connect to DB and check the connection
const connection = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/cityDB';
mongoose.connect(connection, { useNewUrlParser: true })
  .then(() => {console.log('Successfully connected to mongoDB');})
  .catch(error => console.error(error));

const app = express();

const City = require('./client/src/models/city');

// Middlewares
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// 1) to handle getting all posts and their comments, handle add post
app.route('/cities')
  .get((req, res) => {
    City.find({}, (err, cities) => {
      if (err) throw err;
      res.send(cities);
    });
  })
  .post((req, res) => {
    City.create(req.body, (err, cityResult) => {
      if (err) throw err;
      res.send(cityResult);
    });
  });

// 3) to handle deleting a post
app.delete('/cities/:id', (req, res) => {
  const id = req.params.id;
  // Check if the ID is a valid mongoose id
  if (!ObjectID.isValid(id)) {
    return res.status(400).send('Id not in the correct format');
  }
  // delete the post from the DB collection
  City.findByIdAndRemove(id, (err, deletedPost) => {
    if (err) throw err;
    res.json(deletedPost);
  });
});

// 4) to handle adding a comment to a post
app.post('/cities/:id/comments', (req, res) => {
  const id = req.params.id;
  // Check if the ID is a valid mongoose id
  if (!ObjectID.isValid(id)) {
    return res.status(400).send('Id not in the correct format');
  }
  // update the comments array in the DB
  City.findByIdAndUpdate(id, { $push: { comments: req.body }}, { new: true }, (err, updatedPost) => {
    if (err) throw err;
    res.send(updatedPost);
  });
});

// 5) to handle deleting a comment from a post
app.delete('/cities/:postId/comments/:commentId', (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  // Check if the ID is a valid mongoose id
  if (!ObjectID.isValid(postId) && !ObjectID.isValid(commentId)) {
    return res.status(400).send('Id not in the correct format');
  }
  // delete the comment from the DB collection
  City.findByIdAndUpdate(postId, { $pull: { comments: { _id: commentId }}}, { new: true }, (err, updatedPost) => {
    if (err) throw err;
    res.send(updatedPost);
  });
});

// PORT
const SERVER_PORT = process.env.PORT || 3001;
app.listen(SERVER_PORT, () => console.log(`Server up and running on port ${SERVER_PORT}...`));
