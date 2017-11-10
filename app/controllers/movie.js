var Movie = require('../models/movie');
var Category = require('../models/category');
var _ = require('underscore')

exports.save = function(req, res) {
  var id = null;
  if(req.body.movie._id){
    id = req.body.movie._id;
  }
  var movieObj = req.body.movie;
  var _movie;


  if(id) {
    Movie.findById(id, function(err, movie) {
      if(err) {
        console.log(err);
      }

      _movie = _.extend(movie, movieObj)
      _movie.save(function(err, movie) {
        if(err) {
          console.log(err);
        }

        res.redirect('/movie/' + movie._id)
      })
    })
  }else {
    _movie = new Movie(movieObj);

    var categoryId = movieObj.category;
    var categoryName = movieObj.categoryName;

    _movie.save(function(err, movie) {
      if(err) {
        console.log(err);
      }
      if(categoryId) {
        Category.findById(categoryId, function(err, category) {
          category.movie.push(movie._id)

          category.save(function(err, category) {
            res.redirect('/movie/' + movie._id)
          })
        })
      }else if (categoryName) {
        var category = new Category({
          name: categoryName,
          movie: [movie._id]
        })

        category.save(function(err, category) {
          movie.category = category._id;
          movie.save(function(err, movie) {
            res.redirect('/movie/' + movie._id);
          })
        })
      }
    })
  }
}

exports.new = function(req, res) {
  Category.find({}, function(err, categories) {
    res.render('admin', {
      title: '后台录入页',
      categories: categories,
      movie: {}
    })
  })
}

exports.detail = function(req, res) {
  var id = req.params.id;

  Movie.update({_id: id}, {$inc: {pv: 1}}, function(err) {
  if (err) {
    console.log(err)
  }
})

  Movie.findById(id, function(err, movie) {
    if(err) {
      console.log(err);
    }
    res.render('detail', {
      title: '详情页',
      movie: movie
    })
  })
}

exports.update = function(req, res) {
  var id = req.params.id

  if (id) {
    Movie.findById(id, function(err, movie) {
      Category.find({}, function(err, categories) {
        res.render('admin', {
          title: 'imooc 后台更新页',
          movie: movie,
          categories: categories
        })
      })
    })
  }
}

exports.list = function(req, res) {
  Movie.find({})
    .populate('category', 'name')
    .exec(function(err, movies) {
      if (err) {
        console.log(err)
      }

      res.render('list', {
        title: 'imooc 列表页',
        movies: movies
      })
    })
}

exports.del = function(req, res) {
  var id = req.query.id

  if (id) {
    Movie.remove({_id: id}, function(err, movie) {
      if (err) {
        console.log(err)
        res.json({success: 0})
      }
      else {
        res.json({success: 1})
      }
    })
  }
}
