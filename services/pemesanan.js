var pemesanan = require('../models/pemesanan');
var pesanMenu = require('../models/pesan_menu');
var pesanOnline = require('../models/pemesanan_online');
var menu = require('../models/menu');
var user = require('../models/user');
var statusPesanan = require('../models/status_pesanan');
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

  simpanEditMenu: async (data,callback) => {
    await pesanMenu.destroy({
      where: {
        id_pesan_menu: data[0].id_pesan_menu
      }
    });
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

  simpanPemesananOnline: async (data,callback) => {
    await pemesanan.create(data).then(res => {
      callback(null,res);
    })
    .catch(error => {
        callback(error,null);
    });
  },

  simpanPesanOnline: async (data,callback) => {
    await pesanOnline.create(data).then(res => {
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

  findPemesanan: async (id,callback) => {
    await pemesanan.findAll({
      where: {
        id_user: id
      },
        include: [{
          model: pesanMenu,
          include: [menu]
        },
        {
          model: user
        },
        {
          model: pesanOnline
        }]
    }).then(res => {
      callback(null,res);
    })
    .catch(error => {
      callback(error,null);
    });
  },

  simpanEdit: async (data,callback) => {
    await pemesanan.update(data,{
      where: {
        id_pemesanan: data.id_pesan
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
