const { DataTypes, Sequelize } = require("sequelize");
const path = require("path");

//Making the connection

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "db.sqlite"),
  define: {
    timestamps: false,
  },
});

module.exports = { sequelize };
