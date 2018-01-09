var auth = require('../services/auth');

module.exports = (router) => {

  router.get('/login', async (ctx, next) => {
    var page = 'Login Page';
    await ctx.render('admin/auth/login.ejs',{'page' : page});
  });

  router.post('/login', async (ctx, next) => {
    var body = ctx.request.body;
    await auth.post_login(body, (err, data) => {
      if(data.status == 200) {
        ctx.redirect('/admin/dashboard');
      }else{
        ctx.redirect('/admin/login');
      }

    });
  });

  router.get('/dashboard', async (ctx, next) => {

    await ctx.render('admin/index.ejs');
  });

}
