var Sequelize = require("sequelize");
var database = require("../config/database");
var menu = require("./menu");

var pesanMenuScheme = {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_pesan_menu: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id_menu: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    jumlah: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate : {
        notEmpty: {args:true,msg:'Jumlah tidak boleh kosong.'},
        max: {args:true,msg:'Jumlah tidak boleh kosong.'}
      }
    }
};

var PesanMenu = database.mysql.define("pesan_menu", pesanMenuScheme, {
  paranoid: true,
  underscored: true,
  tableName: 'pesan_menu',
  timestamps: false
});

PesanMenu.belongsTo(menu, {foreignKey: 'id_menu'});

module.exports = PesanMenu;
