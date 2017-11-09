var mongoose = require('mongoose');
var User = require('../models/user');

exports.showSignup = function(req, res) {
  res.render('login/signup', {
    title: '注册页面'
  })
}

exports.showSignin = function(req, res) {
  res.render('login/signin', {
    title: '登陆页面'
  })
}

exports.signup = function(req, res) {
  var _user = req.body.user;
  User.findOne({name: _user.name}, function(err, user) {
    if(err) {
      console.log(err);
    }

    if(user) {
      return res.redirect('/signin')
    }else {
      user = new User(_user);
      user.save(function(err, user) {
        if(err) {
          console.log(err);
        }
        res.redirect('/')
      })
    }
  })
}

exports.signin = function(req, res) {
  var _user = req.body.user;

  User.findOne({name: _user.name}, function(err, user) {
    if(err) {
      console.log(err);
    }
    if(!user) {
      res.redirect('/signup');
    }
    if(user) {
      user.comparePassword(_user.password, function(err, isMatch) {
        if(err) {
          console.log(err);
        }
        if(isMatch) {
          req.session.user = user;
          res.redirect('/');
        }else {
          res.redirect('/signin');
        }
      });
    }
  })
}

exports.logout = function(req, res) {
  delete req.session.user;
  res.redirect('/');
}
