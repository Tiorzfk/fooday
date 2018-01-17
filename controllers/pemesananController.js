var pemesanan = require('../services/pemesanan');
var menu = require('../services/menu');
var multer = require('multer');
var shortid = require('shortid');

module.exports = {
  index : async (ctx,next) => {
    var moment = require('moment');
    var dataLogin = ctx.session.dataLogin;
    var msg = ctx.flash('msg') || '';
    var data = [];
    await pemesanan.list((err,res) => {
      if(err)
        ctx.body = err;

      data.push(res);
    });

    await ctx.render('admin/pemesanan/index.ejs',{'moment':moment,'dataLogin':dataLogin,'msg' : msg, 'data' : data[0]});
  },

  detail : async (ctx,next) => {
    var dataLogin = ctx.session.dataLogin;
    await ctx.render('admin/pemesanan/detail.ejs',{'dataLogin':dataLogin});
  },

  tambah : async (ctx,next) => {
    var dataLogin = ctx.session.dataLogin;
    var msg = ctx.flash('msg') || '';
    var dataMenu = [];
    await menu.list((err,res) => {
      if(err)
        ctx.body = err;

      dataMenu.push(res);
    });

    await ctx.render('admin/pemesanan/tambah.ejs',{'dataLogin':dataLogin,'msg' : msg, 'menu' : dataMenu[0]});
    // ctx.body = ctx.flash('error');
  },

  pesanMenu : async (ctx,next) => {
    await menu.pesanMenu(ctx.request.body.id_menu,(err,res) => {
      if(err)
        ctx.body = err;

      var total_harga=0;
      res.map((data) => {
        total_harga += data.harga;
      });
      ctx.body = {status:200,message:'success',result:total_harga};
    });
  },

  simpanTambah : async (ctx,next) => {
    var id_pesan = shortid.generate();
    var harga = ctx.request.body.harga;
    var id_menu = ctx.request.body.id_menu.split(',');

    var dataPesanMenu = [];
    for (var i = 0; i < id_menu.length; i++) {
      dataPesanMenu.push({id_pesan_menu:id_pesan,id_menu:id_menu[i],jumlah:1});
    }

    var dataPemesanan = {id_pesan:id_pesan,id_user:'5',status:'walkin',total_harga:harga};
    await pemesanan.simpanPemesanan(dataPemesanan, (err,res) => {
      if(err) {
        ctx.flash('msg', err);
        ctx.redirect('/admin/pemesanan/add');
      }else{
        ctx.flash('msg', 'pemesanan Berhasil Ditambahkan');
        ctx.redirect('/admin/pemesanan/add');
      }
    });

    await pemesanan.simpanMenu(dataPesanMenu, (err,res) => {
      if(err) {
        ctx.body = err;
      }else{
        ctx.body = res;
      }
    });

    // await ctx.redirect('/admin/pemesanan/add');
  },

  edit : async (ctx,next) => {
    var dataLogin = ctx.session.dataLogin;
    var msg = ctx.flash('msg') || '';
    var data = [];
    await pemesanan.find(ctx.params.id, (err,res) => {
      if(err) {
        ctx.flash('msg', err);
        ctx.redirect(`/admin/pemesanan/edit/${ctx.params.id}`);
      }else{
        data.push(res);
      }
    });

    var dataMenu = [];
    await menu.list((err,res) => {
      if(err)
        ctx.body = err;

      dataMenu.push(res);
    });

    await ctx.render('admin/pemesanan/edit.ejs',{'dataMenu':dataMenu[0],'dataLogin':dataLogin,'msg': msg, 'data' : data[0]});
  },

  simpanEdit : async (ctx,next) => {
    var id_pesan = ctx.request.body.id_pesan;
    var harga = ctx.request.body.harga;
    var id_menu = ctx.request.body.id_menu.split(',');

    var dataPesanMenu = [];
    for (var i = 0; i < id_menu.length; i++) {
      dataPesanMenu.push({id_pesan_menu:id_pesan,id_menu:id_menu[i],jumlah:1});
    }

    var dataPemesanan = {id_pesan:id_pesan,id_user:'2',status:'walkin',total_harga:harga};
    await pemesanan.simpanEdit(dataPemesanan, (err,res) => {
      if(err) {
        ctx.flash('msg', err);
        ctx.redirect('/admin/pemesanan/edit/'+ctx.params.id);
      }else{
        ctx.flash('msg', 'pemesanan Berhasil Diubah');
        ctx.redirect('/admin/pemesanan/edit/'+ctx.params.id);
      }
    });

    await pemesanan.simpanEditMenu(dataPesanMenu, (err,res) => {
      if(err) {
        ctx.body = err;
      }else{
        ctx.body = res;
      }
    });
  },

  delete : async (ctx,next) => {
    await pemesanan.delete(ctx.params.id, (err,res) => {
      if(err) {
        ctx.flash('msg', 'Terjadi Kesalan');
        ctx.redirect('/admin/pemesanan');
      }else{
        ctx.flash('msg', 'pemesanan Berhasil Dihapus');
        ctx.redirect('/admin/pemesanan');
      }
    });
  }
}
