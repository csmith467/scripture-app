'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var verseSchema = mongoose.Schema({
  book: String,
  chapter: String,
  verse: String
})

var Verse = mongoose.model('Kitten', verseSchema);

// Get all verses
router.get('/', function(req, res) {
  Verse.find({}).exec(function(err, result) {
    if (!err) {
      res.json(result);
    }
  });
});

// Save verse
router.post('/', function(req, res) {
  Verse.create(req.body, function(err, doc) {
    res.json(doc);
  });
});

module.exports = router;
