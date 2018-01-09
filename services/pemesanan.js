var pemesanan = require('../models/pemesanan');

module.exports = {
  list: async (callback) => {
      await pemesanan.findAll().then(data => {
        console.log(data);
          callback(null,data);
      })
      .catch(err => {
          callback(err,null);
      });
  },

  simpan: async (data,callback) => {
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
