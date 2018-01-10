var Sequelize = require("sequelize");
var database = require("../config/database");

var pemesananOnlineScheme = {
    id_penjualan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_pesan: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id_driver: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM,
        values: ['ongoing','success'],
        allowNull: false
    }
};

var PemesananOnline = database.mysql.define("pemesanan_online", pemesananOnlineScheme, {
  paranoid: true,
  underscored: false,
  tableName: 'pemesanan_online',
  timestamps: false
});

module.exports = PemesananOnline;
