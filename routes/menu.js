var menu = require('../controllers/menuController');
var multer = require('koa-multer');
const upload = multer({ dest: 'frontend/img_user/' });

module.exports = (router) => {

  router.get('/menu', menu.index);

  router.get('/menu/add', menu.tambah);

  router.post('/menu/add', menu.simpanTambah);

  // router.post('/menu/add', upload.any(), function (ctx,next) {
  //  console.log(ctx.request);
  //  this.body = 'done'
  // });

  router.get('/menu/edit/:id', menu.edit);

  router.post('/menu/edit/:id', menu.simpanEdit);

  router.get('/menu/delete/:id', menu.delete);

}
