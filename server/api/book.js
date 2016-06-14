'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
  order: Number,
  abbr: String,
  name: String,
  chapters: Number,
  testament: String
}, { collection: 'book'})

var Book = mongoose.model('book', bookSchema);

// Get all books
router.get('/', function(req, res) {
  Book.find({}).exec(function(err, result) {
    if (!err) {
      res.json(result);
    }
  });
});

module.exports = router;
