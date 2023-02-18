const { sequelize } = require("../src/connection");
const { DataTypes } = require("sequelize");

const Items = sequelize.define("Items", {
  name: DataTypes.STRING,
  image: DataTypes.STRING,
  price: DataTypes.NUMBER,
  vegetarian: DataTypes.BOOLEAN,
});

module.exports = { Items };
