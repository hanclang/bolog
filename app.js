var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var moment = require('moment');
var mongoStore = require('connect-mongo')(session);
var port = process.env.PORT || 3000;
var app = express();
var fs = require('fs');
var dbUrl = 'mongodb://localhost/my';


//连接mongodb
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);


//静态资源
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './app/views');
app.set('view engine', 'jade');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: 'my',
  store: new mongoStore({
      url: dbUrl,
      collection: 'session',
    }),
  resave: false,
  saveUninitialized: true
}));


moment.locale('zh-cn');
app.locals.moment = moment;

require('./config/routes')(app);

app.listen(port);
