const { sequelize } = require("../src/connection");
const { DataTypes } = require("sequelize");
const Courses = sequelize.define("Courses", {
  coursesId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = { Courses };
