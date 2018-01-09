var menu = require('../services/menu');
var multer = require('multer');

module.exports = {
  index : async (ctx,next) => {
    var msg = ctx.flash('msg') || '';
    var data = [];
    await menu.list((err,res) => {
      if(err)
        ctx.body = err;

      data.push(res);
    });

    await ctx.render('admin/menu/index.ejs',{'msg':msg, 'data' : data[0]});
  },

  tambah : async (ctx,next) => {
    var msg = ctx.flash('msg') || '';
    await ctx.render('admin/menu/tambah.ejs',{'msg' : msg});
    // ctx.body = ctx.flash('error');
  },

  simpanTambah : async (ctx,next) => {
    await menu.simpan(ctx.request.body, (err,res) => {
      if(err) {
        var errMsg = "";
        err.errors.forEach((data) => {
          errMsg += `${data.message} </br>`;
        });
        ctx.flash('msg', errMsg);
        ctx.redirect('/admin/menu/add');
      }else{
        ctx.flash('msg', 'Menu Berhasil Ditambahkan');
        ctx.redirect('/admin/menu/add');
      }
    });

    // await ctx.redirect('/admin/menu/add');
  },

  edit : async (ctx,next) => {
    var msg = ctx.flash('msg') || '';
    var data = [];
    await menu.find(ctx.params.id, (err,res) => {
      if(err) {
        ctx.flash('msg', err);
        ctx.redirect(`/admin/menu/edit/${ctx.params.id}`);
      }else{
        data.push(res);
      }
    });

    await ctx.render('admin/menu/edit.ejs',{'msg': msg, 'data' : data[0]});
  },

  simpanEdit : async (ctx,next) => {
    await menu.simpanEdit(ctx.request.body, (err,res) => {
      if(err) {
        var errMsg = "";
        err.errors.forEach((data) => {
          errMsg += `${data.message} </br>`;
        });
        ctx.flash('msg', errMsg);
        ctx.redirect('/admin/menu/edit/'+ctx.params.id);
      }else{
        ctx.flash('msg', 'Menu Berhasil Diubah');
        ctx.redirect('/admin/menu/edit/'+ctx.params.id);
      }
    });
  },

  delete : async (ctx,next) => {
    await menu.delete(ctx.params.id, (err,res) => {
      if(err) {
        ctx.flash('msg', 'Terjadi Kesalan');
        ctx.redirect('/admin/menu');
      }else{
        ctx.flash('msg', 'Menu Berhasil Dihapus');
        ctx.redirect('/admin/menu');
      }
    });
  }
}
