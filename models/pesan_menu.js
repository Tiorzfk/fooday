var Sequelize = require("sequelize");
var database = require("../config/database");

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
    }
};

var PesanMenu = database.mysql.define("pesan_menu", pesanMenuScheme, {
  paranoid: true,
  underscored: true,
  tableName: 'pesan_menu',
  timestamps: false
});

module.exports = PesanMenu;
