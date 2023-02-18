const { sequelize } = require("./src/connection");
const { Restaurants } = require("./models/Restaurant");
const { Menus } = require("./models/Menus");
const { Items } = require("./models/Items");
const { Courses } = require("./models/Courses");
//One to Many relationship

Restaurants.hasMany(Menus);
Menus.belongsTo(Restaurants);

//Many to Many relationship
Menus.belongsToMany(Items, { through: Courses });
Items.belongsToMany(Menus, { through: Courses });

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
    { title: "Brunch" },
    { title: "Starters" },
    { title: "Main" },
    { title: "Deserts" },
    { title: "Drink" },
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

  //MANY TO MANY RELATIONSHIP / ASSOCIATION

  //Already have the Menus, Bulk Create the Items

  await Items.bulkCreate([
    {
      name: "Salad",
      image: "An Image of greek Salad",
      price: 3,
      vegetarian: true,
    },
    {
      name: "Wine",
      image: "An Image of a glass of Wine",
      price: 6,
      vegetarian: true,
    },
    {
      name: "New York Meat Burger",
      image: "An Image of a CheeseBurger",
      price: 5.5,
      vegetarian: false,
    },
    {
      name: "Chicken Curry",
      image: "An Image of Chicken Curry",
      price: 8.5,
      vegetarian: false,
    },
    {
      name: "French Toast",
      image: "An Image of French Toast",
      price: 4.2,
      vegetarian: false,
    },
    {
      name: "Chocolate Cake",
      image: "An Image of slice of Chocolate Cake",
      price: 6,
      vegetarian: true,
    },
  ]);

  //Making the associations between Menu and Items
  const Brunch = await Menus.findByPk(1);
  const Starters = await Menus.findByPk(2);
  const Main = await Menus.findByPk(3);
  const Deserts = await Menus.findByPk(4);
  const Drinks = await Menus.findByPk(5);

  await Brunch.addItems(5);
  await Starters.addItems(1);
  await Main.addItems(3);
  await Main.addItems(4);
  await Drinks.addItems(2);
  await Deserts.addItems(6);
};

main();
