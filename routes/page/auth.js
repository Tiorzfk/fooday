var auth = require('../../services/auth');

module.exports = (router) => {

  router.get('/login', async (ctx, next) => {
    var page = 'Login Page';
    await ctx.render('page/login.ejs',{'page' : page});
  });

  router.post('/login', async (ctx, next) => {
    var body = ctx.request.body;
    await auth.post_login(body, (err, data) => {
      if(data.status == 200) {
        ctx.redirect('/menu');
      }else{
        ctx.redirect('/login');
      }

    });
  });

}
