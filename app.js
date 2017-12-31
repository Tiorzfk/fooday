const Koa = require('koa');
const app = new Koa();

var port = '8000';

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(port,() => {
  console.log(`Listen on port : ${port}`);
});
