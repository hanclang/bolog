var mongoose = require('mongoose');
var Movie = require('../models/movie');
var Category = require('../models/category');

exports.index = function(req, res) {
  Category
    .find({})
    .populate({
      path: 'movie',
      options: {limit: 6}
    })
    .exec(function(err, categories) {
      if(err) {
        console.log(err);
      }

      res.render('index', {
        title: '首页',
        categories: categories
      })
    })
}
