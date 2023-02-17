// The Restaurant model should have name, location and cuisine properties, all of which are strings.

const { sequelize } = require("../src/connection");
const { DataTypes } = require("sequelize");

const Restaurants = sequelize.define("restaurants", {
  name: DataTypes.STRING,
  location: DataTypes.STRING,
  cuisine: DataTypes.STRING,
});

module.exports = { Restaurants };
