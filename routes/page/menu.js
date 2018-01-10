var menu = require('../../services/menu');

module.exports = (router) => {

  router.get('/menu', async function(ctx,next) {
    var data = [];
    var dataMinum = [];
    await menu.list((err,res) => {
      if(err)
        ctx.body = err;

      data.push(res);
    });

    await menu.findKategori('minuman',(err,res) => {
      if(err)
        ctx.body = err;

      dataMinum.push(res);
    });

    await ctx.render('page/menu/index.ejs',{'data' : data[0],'dataMinum' : dataMinum[0]});
  });

  router.get('/menu/kategori/:kategori', async function(ctx,next) {
    var data = [];
    var dataMinum = [];
    await menu.findKategori(ctx.params.kategori,(err,res) => {
      if(err)
        ctx.body = err;

      data.push(res);
    });

    await menu.findKategori('minuman',(err,res) => {
      if(err)
        ctx.body = err;

      dataMinum.push(res);
    });

    await ctx.render('page/menu/index.ejs',{'data' : data[0],'dataMinum' : dataMinum[0]});
  });

  router.get('/cart', async function(ctx,next) {

    await ctx.render('page/menu/index.ejs',{'data' : data[0],'dataMinum' : dataMinum[0]});
  });

}
