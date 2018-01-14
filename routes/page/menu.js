var menu = require('../../services/menu');
var pemesanan = require('../../services/pemesanan');
var shortid = require('shortid');

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

    await ctx.render('page/cart.ejs');
  });

  router.post('/pesan/online', async function(ctx,next) {

    var id_pesan = shortid.generate();
    var harga = ctx.request.body.total_harga;
    var id_menu = JSON.parse(ctx.request.body.id_menu);

    var dataPesanMenu = [];
    for (var i = 0; i < id_menu.length; i++) {
      dataPesanMenu.push({id_pesan_menu:id_pesan,id_menu:id_menu[i].id,jumlah:id_menu[i].jumlah});
    }

    console.log(dataPesanMenu);

    var dataPemesanan = {id_pesan:id_pesan,id_user:'6',status:'online',total_harga:harga};
    await pemesanan.simpanPemesananOnline(dataPemesanan, (err,res) => {
      if(err) {
        ctx.body = err;
      }else{
        ctx.body = res;
      }
    });

    await pemesanan.simpanMenu(dataPesanMenu, (err,res) => {
      if(err) {
        ctx.body = err;
      }else{
        ctx.body = res;
      }
    });

    var dataPemesananOnline = {id_pesan:id_pesan,id_driver:0,status:'ongoing'};
    await pemesanan.simpanPesanOnline(dataPemesananOnline, (err,res) => {
      if(err) {
        ctx.body = err;
      }else{
        ctx.body = res;
      }
    });
  });
}
