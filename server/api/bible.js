'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var bibleSchema = mongoose.Schema({
  abbr: String,
  book: String,
  chapter: Number,
  verses: Number
}, { collection: 'bible'});

var Bible = mongoose.model('bible', bibleSchema);

// Get all bible records
router.get('/', function(req, res) {
  Bible.find({}).exec(function(err, result) {
    if (!err) {
      res.json(result);
    }
  });
});

// Get number of verses in a given chapter
router.get('/verses', function(req, res) {
  Bible.find({ book: req.query.book, chapter: req.query.chapter }).exec(function(err, result) {
    if (!err) {
      res.json(result);
    }
  });
});

router.get('/books', function(req, res) {
  Bible.distinct('short', function(err, doc) {
    res.json(doc);
  });
});

// Save book
router.post('/', function(req, res) {
  Bible.create(req.body, function(err, doc) {
    res.json(doc);
  });
});

module.exports = router;
