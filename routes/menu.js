var menu = require('../controllers/menuController');

module.exports = (router) => {

  router.get('/menu', menu.index);

  router.get('/menu/add', menu.tambah);

  router.post('/menu/add', menu.simpanTambah);

  router.get('/menu/edit/:id', menu.edit);

  router.post('/menu/edit/:id', menu.simpanEdit);

  router.get('/menu/delete/:id', menu.delete);

}
