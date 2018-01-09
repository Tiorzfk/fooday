var user = require('../models/user');

module.exports = {
  list: async (callback) => {
      await user.findAll().then(data => {
          callback(null,data);
      })
      .catch(err => {
          callback(err,null);
      });
  },

  simpanEdit: async (data,callback) => {
    await user.update(data,{
      where: {
        id_user: data.id_user
      }
    }).then(res => {
      callback(null,res);
    })
    .catch(error => {
      callback(error,null);
    });
  },

  delete: async (id,callback) => {
    await user.destroy({
      where: {
        id_user: id
      }
    }).then(res => {
      callback(null,res);
    })
    .catch(error => {
      callback(error,null);
    })
  }
}
