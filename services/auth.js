var user = require('../models/user');

module.exports = {
  post_login: async (body,callback) => {
    console.log(body);
      await user.findOne({where : {'username' : body.username, 'password' : body.password} }).then(data => {
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
