var mongoose = require('mongoose');
var Movie = require('../models/movie');
var Category = require('../models/category');
const path = require('path');
var fs = require('fs');

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

      res.render('index/index', {
        title: '首页',
        categories: categories
      })
    })
}

exports.test = function(req, res) {
  res.render('test')
}

exports.upload = function(req, res) {
  console.log(__dirname);
  var picData = req.files.yourFileName;
  var originalFilename = picData.originalFilename;
  var filePath = picData.path;
  fs.readFile(filePath, (err, data) => {
    var name = Date.now();
    var type = picData.type.split('/')[1];
    var headPic = name + '.' + type;
    var newPath = path.join(__dirname, '../../', 'public/upload/' + headPic);
    fs.writeFile(newPath, data, (err, data) => {
      res.send({
        errno: 0,
        data: ["/upload/" + headPic]
      })
    })
  })

}
