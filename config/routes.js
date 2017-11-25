var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Login = require('../app/controllers/login');
var Movie = require('../app/controllers/movie');
var Category = require('../app/controllers/category');
var Label = require('../app/controllers/label');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

module.exports = function(app) {
  app.use(function(req, res, next) {
    var _user = req.session.user;
    if(_user) {
      app.locals.user = _user;
    }
    next();
  })
  app.get("/label/add", Label.saveLabel);
  app.get('/label', Label.findAll);
  app.get('/label/del', Label.deleteLabel);

  app.get('/', Index.index);
  app.get('/test', Index.test);
  app.post('/upload', multipartMiddleware, Index.upload);

  app.post('/user/signup', Login.signup);
  app.post('/user/signin', Login.signin);
  app.get('/signin', Login.showSignin);
  app.get('/signup', Login.showSignup);
  app.get('/logout', Login.logout);
  app.get('/logout', Movie.add);


  app.get('/admin/updateUser', User.updateUser);
  app.get('/admin/userList', User.userList);
  app.post('/admin/saveUser', multipartMiddleware, User.savePic, User.saveUser);

  app.get('/movie/:id', Movie.detail);
  app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new);
  app.post('/admin/movie', User.signinRequired, User.adminRequired, Movie.save);
  app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update)
  app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list)
  app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.del)

  app.get('/admin/category/new', User.signinRequired, User.adminRequired, Category.new)
  app.post('/admin/category', User.signinRequired, User.adminRequired, Category.save)
  app.get('/admin/category/list', User.signinRequired, User.adminRequired, Category.list)
}
