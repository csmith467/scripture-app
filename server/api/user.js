'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  passcode: String,
  first: String,
  last: String
}, { collection: 'user'})

var User = mongoose.model('user', userSchema);

// Get all users
router.get('/', function(req, res) {
  User.find({}).exec(function(err, result) {
    if (!err) {
      res.json(result);
    }
  });
});

// Get specific user
router.get('/:passcode', function(req, res) {
  User.find({ passcode: req.params.passcode }).exec(function(err, result) {
    if (!err) {
      res.json(result);
    }
  });
});

// Save user
router.post('/', function(req, res) {
  console.log(req.body)
  User.create(req.body, function(err, doc) {
    res.json(doc);
  });
});

module.exports = router;
