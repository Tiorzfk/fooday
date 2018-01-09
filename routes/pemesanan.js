var pemesanan = require('../controllers/pemesananController');

module.exports = (router) => {

  router.get('/pemesanan', pemesanan.index);

  router.get('/pemesanan/add', pemesanan.tambah);

  router.post('/pemesanan/add', pemesanan.simpanTambah);

  router.get('/pemesanan/edit/:id', pemesanan.edit);

  router.post('/pemesanan/edit/:id', pemesanan.simpanEdit);

  router.get('/pemesanan/delete/:id', pemesanan.delete);

  router.post('/pesan-menu', pemesanan.pesanMenu);

}
