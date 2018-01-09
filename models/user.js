var Sequelize = require("sequelize");
var database = require("../config/database");

var userScheme = {
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: Sequelize.STRING(15),
        allowNull: false
    },
    username: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    jenis_user: {
        type: Sequelize.ENUM,
        values: ['owner','karyawan','kasir','user'],
        allowNull: false
    }
};

var User = database.mysql.define("user", userScheme, {
  tableName: 'user',
  timestamps: false
});

module.exports = User;
