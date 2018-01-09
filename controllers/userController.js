var user = require('../services/user');
var multer = require('multer');

module.exports = {
  index : async (ctx,next) => {
    var data = [];
    await user.list((err,res) => {
      if(err)
        ctx.body = err;

      data.push(res);
    });

    await ctx.render('admin/user/index.ejs',{'data' : data[0]});
  },

  edit : async (ctx,next) => {
    var msg = ctx.flash('msg') || '';
    var data = [];
    await user.find(ctx.params.id, (err,res) => {
      if(err) {
        ctx.flash('msg', err);
        ctx.redirect(`/admin/user/edit/${ctx.params.id}`);
      }else{
        data.push(res);
      }
    });

    await ctx.render('admin/user/edit.ejs',{'msg': msg, 'data' : data[0]});
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
