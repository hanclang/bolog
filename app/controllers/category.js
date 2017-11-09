var mongoose = require('mongoose');
var Category = mongoose.model('Category');

exports.new = function(req, res) {
  res.render('category_admin', {
    title: '分类录入页',
    category: []
  })
}

exports.save = function(req, res) {
  var category = req.body.category;
  var _category = new Category(category);

  _category.save(function(err, category) {
    if(err) {
      console.log(err);
    }

    res.redirect('/admin/category/list');
  })
}

exports.list = function(req, res) {
  Category.fetch(function(err, categories) {
    if(err) {
      console.log(err);
    }

    res.render('categorylist', {
      title: '分类列表',
      categories: categories
    })
  })
}
