var user = require('../controllers/userController');

module.exports = (router) => {

  router.get('/user', user.index);

  router.get('/user/edit/:id', user.edit);

  router.post('/user/edit/:id', user.simpanEdit);

  router.get('/user/delete/:id', user.delete);

}
