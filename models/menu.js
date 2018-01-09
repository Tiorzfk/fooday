var Sequelize = require("sequelize");
var database = require("../config/database");

var userScheme = {
    id_menu: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: Sequelize.STRING(15),
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Nama Menu tidak boleh kosong.'}
        }
    },
    harga: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Harga tidak boleh kosong.'}
        }
    },
    stok: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Stok tidak boleh kosong.'}
        }
    },
    sifat: {
        type: Sequelize.ENUM,
        values: ['T','BT'],
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Anda belum memilih sifat.'}
        }
    },
    jenis_menu: {
        type: Sequelize.ENUM,
        values: ['makanan','minuman','makanan_ringan'],
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Anda belum memilih jenis menu.'}
        }
    }
};

var User = database.mysql.define("menu", userScheme, {
  paranoid: true,
  underscored: true,
  tableName: 'menu',
  timestamps: false
});

module.exports = User;
