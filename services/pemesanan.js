var pemesanan = require('../models/pemesanan');
var pesanMenu = require('../models/pesan_menu');
var menu = require('../models/menu');
var user = require('../models/user');
var shortid = require('shortid');

module.exports = {
  list: async (callback) => {
      await pemesanan.findAll(
        {
          include: [{
            model: pesanMenu,
            include: [menu]
          },
          {
            model: user
          }]
        }).then(data => {
          callback(null,data);
      })
      .catch(err => {
          callback(err,null);
      });
  },

  simpanMenu: async (data,callback) => {
    await pesanMenu.bulkCreate(data).then(res => {
      callback(null,res);
    })
    .catch(error => {
        callback(error,null);
    });
  },

  simpanPemesanan: async (data,callback) => {
    await pemesanan.create(data).then(res => {
      callback(null,res);
    })
    .catch(error => {
        callback(error,null);
    });
  },

  find: async (id,callback) => {
    await pemesanan.findById(id).then(res => {
      callback(null,res);
    })
    .catch(error => {
      callback(error,null);
    });
  },

  simpanEdit: async (data,callback) => {
    await pemesanan.update(data,{
      where: {
        id_pemesanan: data.id_pemesanan
      }
    }).then(res => {
      callback(null,res);
    })
    .catch(error => {
      callback(error,null);
    });
  },

  delete: async (id,callback) => {
    await pemesanan.destroy({
      where: {
        id_pemesanan: id
      }
    }).then(res => {
      callback(null,res);
    })
    .catch(error => {
      callback(error,null);
    })
  }

}
