var auth = require('../../services/auth');
var pemesanan = require('../../services/pemesanan');

module.exports = (router) => {

  router.get('/login', async (ctx, next) => {
    var page = 'Login Page';
    await ctx.render('page/login.ejs',{'page' : page});
  });

  router.post('/login', async (ctx, next) => {
    var body = ctx.request.body;
    console.log(body);
    await auth.post_login(body, (err, data) => {
      if(err) {
        ctx.body = err;
      }else{
        ctx.body = data
      }

    });
  });

  router.get('/me', async (ctx, next) => {
    await ctx.render('page/profile.ejs');
  });

  router.post('/pemesananMe', async (ctx, next) => {
    await pemesanan.findPemesanan(ctx.request.body.id_user, (err,res) => {
      if(err) {
        ctx.body = err;
      }else{
        ctx.body = res;
      }
    });
  });

  router.get('/detail', async (ctx, next) => {
    var page = 'Login Page';
    await ctx.render('page/login.ejs',{'page' : page});
  });

}
