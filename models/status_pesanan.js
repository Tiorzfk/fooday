var Sequelize = require("sequelize");
var database = require("../config/database");
var menu = require("./menu");

var statusPesanScheme = {
    id_status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_pesan: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    status: {
      type: Sequelize.ENUM,
      values: ['prepare','prepared'],
    }
};

var PesanMenu = database.mysql.define("pesan_menu", statusPesanScheme, {
  paranoid: true,
  underscored: true,
  tableName: 'pesan_menu',
  timestamps: false
});

PesanMenu.belongsTo(menu, {foreignKey: 'id_menu'});

module.exports = PesanMenu;
