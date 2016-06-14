'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var verseSchema = mongoose.Schema({
  passcode: String,
  book: String,
  chapter: String,
  verse: String
}, { collection: 'verse'})

var Verse = mongoose.model('verse', verseSchema);

// Get all verses
router.get('/', function(req, res) {
  Verse.find({ passcode: req.query.passcode }).exec(function(err, result) {
    if (!err) {
      res.json(result);
    }
  });
});

// Get all verses
router.get('/:id', function(req, res) {
  Verse.findById(req.params.id).exec(function(err, result) {
    if (!err) {
      res.json(result);
    }
  });
});

// Save verse
router.post('/', function(req, res) {
  console.log(req.body)
  Verse.create(req.body, function(err, doc) {
    res.json(doc);
  });
});

module.exports = router;
