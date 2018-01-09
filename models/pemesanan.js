var Sequelize = require("sequelize");
var database = require("../config/database");
var pesanMenu = require("./pesan_menu");

var pemesananScheme = {
    id_pesan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM,
        values: ['walkin','online'],
        allowNull: false
    },
    total_harga: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Harga tidak boleh kosong.'}
        }
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
};

var Pemesanan = database.mysql.define("pemesanan", pemesananScheme, {
  paranoid: true,
  underscored: false,
  tableName: 'pemesanan',
  timestamps: false
});

Pemesanan.hasMany(pesanMenu, {foreignKey: 'id_pesan_menu'});

module.exports = Pemesanan;
