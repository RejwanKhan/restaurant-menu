const { sequelize } = require("./src/connection");
const { Restaurants } = require("./models/Restaurant");
const { Menus } = require("./models/Menus");

//One to Many relationship

Restaurants.hasMany(Menus);
Menus.belongsTo(Restaurants);

const main = async () => {
  await sequelize.sync({ force: true });

  //Bulk Create Restaurants
  await Restaurants.bulkCreate([
    {
      name: "Patty&Buns",
      location: "New York",
      cuisine: "American",
      rating: 5,
    },
    {
      name: "CurryHouse",
      location: "Dhaka",
      cuisine: "South-Asian",
      rating: 8,
    },
    { name: "McDonalds", location: "Austin", cuisine: "American", rating: 8 },
  ]);

  //Bulk Create Menus
  await Menus.bulkCreate([
    { title: "New York Classic Burger" },
    { title: "Fillet O' Fish Burger" },
    { title: "Chicken Curry" },
    { title: "Meat Curry" },
    { title: "McPlant" },
  ]);

  //Get the Restaurants

  const pattyAndBuns = await Restaurants.findByPk(1);
  const curryHouse = await Restaurants.findByPk(2);
  const mcDonalds = await Restaurants.findByPk(3);

  await pattyAndBuns.addMenus(1);
  await mcDonalds.addMenus(2);
  await curryHouse.addMenus(3);
  await curryHouse.addMenus(4);
  await mcDonalds.addMenus(5);
};

main();
