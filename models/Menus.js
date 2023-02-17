// The Menu model should have title which is also a string.

const { sequelize } = require("../src/connection");
const { DataTypes } = require("sequelize");

const Menus = sequelize.define("Menu", {
  title: DataTypes.STRING,
});

module.exports = { Menus };
