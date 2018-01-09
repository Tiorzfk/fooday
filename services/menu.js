var menu = require('../models/menu');
var multer = require('multer');

module.exports = {
  list: async (callback) => {
      await menu.findAll().then(data => {
          callback(null,data);
      })
      .catch(err => {
          callback(err,null);
      });
  },

  simpan: async (data,callback) => {
    await menu.create(data).then(res => {
      callback(null,res);
    })
    .catch(error => {
        callback(error,null);
    });
  },

  find: async (id,callback) => {
    await menu.findById(id).then(res => {
      callback(null,res);
    })
    .catch(error => {
      callback(error,null);
    });
  },

  simpanEdit: async (data,callback) => {
    await menu.update(data,{
      where: {
        id_menu: data.id_menu
      }
    }).then(res => {
      callback(null,res);
    })
    .catch(error => {
      callback(error,null);
    });
  },

  delete: async (id,callback) => {
    await menu.destroy({
      where: {
        id_menu: id
      }
    }).then(res => {
      callback(null,res);
    })
    .catch(error => {
      callback(error,null);
    })
  }

}
