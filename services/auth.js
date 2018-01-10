var user = require('../models/user');
// var detailUser = require('../models/detailUser');

module.exports = {
  post_login: async (body,callback) => {
      await user.findOne({where : {'username' : body.username, 'password' : body.password} }).then(data => {
          if(data)
            callback(null,{status:200,msg:'success',result:data});
          else
            callback(null,{status:400,msg:'username atau password anda salah',result:[]})
      })
      .catch(err => {
          callback({status:400,msg:err,result:[]},null);
      });
  },

  detail: async (body,callback) => {
      await user.findOne({where : {'username' : body.username} }).then(data => {
          if(data)
            callback(null,{status:200,msg:'success',result:data});
          else
            callback(null,{status:400,msg:'username atau password anda salah',result:[]})
      })
      .catch(err => {
          callback({status:400,msg:err,result:[]},null);
      });
  }
}
