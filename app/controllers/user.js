var mongoose = require('mongoose');
var User = require('../models/user');
var path = require('path');
var fs = require('fs');

exports.signinRequired = function(req, res, next) {
  var user = req.session.user

  if (!user) {
    return res.redirect('/signin')
  }

  next()
}

exports.adminRequired = function(req, res, next) {
  var user = req.session.user

  if (user.role <= 10) {
    return res.redirect('/signin')
  }

  next()
}

exports.savePic = function(req, res, next) {
  var posterData = req.files.uploadPic;
  var filePath = posterData.path;
  var originalFilename = posterData.originalFilename;
  console.log(posterData+'\n',filePath+'\n',originalFilename+'\n');
  if(originalFilename) {
    fs.readFile(filePath, (err, data) => {
      var timestamp = Date.now();
      var type = posterData.type.split('/')[1];
      var headPic = timestamp + '.' + type;
      var newPath = path.join(__dirname, '../../', 'public/upload/' + headPic);
      console.log(newPath);
      fs.writeFile(newPath, data, (err, data) => {
        req.headPic = "/upload/" + headPic;
        next();
      })
    })
  }else {
    next();
  }
}

exports.updateUser = function(req, res) {
  var userId = req.query.id;
  if(userId) {
    User.findById(userId, function(err, user) {
      res.render('user/adminForm', {
        title: '用户录入页',
        user: user
      })
    })
  }else {
    res.render('user/adminForm', {
      title: '用户录入页',
      user: {}
    })
  }
}

exports.saveUser = function(req, res) {
  var userObj = req.body.user;
  var headPic = req.headPic;
  var userId = userObj._id;

  var _User;
  if(userId) {
    User.findById(userId, function(err, user) {
      if(err) {
        console.log(err);
      }else {
        _User = Object.assign(user, userObj);
        if(headPic) {
          _User.img = headPic;
        }
        _User.save(function(err, user) {
          if(err) {
            console.log(err);
          }
          res.redirect('/');
        })
      }
    })
  }else {
    _User = new User(userObj);
    if(headPic) {
      _User.img = headPic;
    }else {
      _User.img = "/upload/1.jpg";
    }
    _User.save(function(err, user) {
      if(err) {
        console.log(err);
      }
      res.redirect('/');
    })
  }
}

exports.userList = function(req, res) {
  User.fetch(function(err, users) {
    if(err) {
      console.log(err);
    }
    res.render('user/adminList', {
      title: "用户列表",
      users: users
    })
  })
}
