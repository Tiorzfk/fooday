// require('dotenv').config();

const Koa = require('koa');
var bodyParser = require('koa-bodyparser');
var session = require('koa-generic-session');
var flash = require('koa-connect-flash');
const app = new Koa();
var logger = require('koa-logger');
var serve = require('koa-static');
const json = require('koa-json')
var views = require('koa-views');
var ender = require('koa-router-static');

// var route = require('koa-route');
var Router = require('koa-router');
var router = new Router({
  prefix: '/admin'
});

var routerPage = new Router({
  prefix: ''
});

var compress = require('koa-compress');
var path = require('path');
var databases = require("./config/database");

app.use(views(__dirname + '/views', {
  map: {
    ejs: 'ejs'
  }
}));

//routes
var menu = require('./routes/menu')(router);
//user
var user = require('./routes/user')(router);
//auth
var user = require('./routes/auth')(router);
//pemesanan
var user = require('./routes/pemesanan')(router);


//API Menu
require('./routes/page/menu')(routerPage);
require('./routes/page/auth')(routerPage);

var port = '8000';

// BodyParser
app.use(bodyParser());

app.keys = ['bismilahinshaalahmudahmudahanberes'];

app.use(session(app));
app.use(flash());

// json respon
app.use(json());

// Logger
app.use(logger());

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(routerPage.routes())
  .use(routerPage.allowedMethods());

// Serve static files
app.use(serve(path.join(__dirname, 'public')));


// Compress
app.use(compress());

databases.mysql.sync({force: false}).then(() => {
  app.listen(port,() => {
    console.log(`Listen on port : ${port}`);
  });

  app.on('error', err => {
    console.log('server error', err)
  });
});
