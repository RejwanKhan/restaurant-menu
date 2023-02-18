const { sequelize } = require("./src/connection");
const { Restaurants } = require("./models/Restaurant");
const { Menus } = require("./models/Menus");

Restaurants.hasMany(Menus);
Menus.belongsTo(Restaurants);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

beforeEach(async () => {
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
});

afterEach(async () => {
  await sequelize.sync({ force: true });
});

describe("Testing One to Many relationship", () => {
  it("Testing One to Many relationship between Restaurants and Menus", async () => {
    //Get all the Restaurants
    const pattyAndBuns = await Restaurants.findByPk(1);
    const curryHouse = await Restaurants.findByPk(2);
    const mcDonald = await Restaurants.findByPk(3);

    //Add menus to the Restaurants
    await pattyAndBuns.addMenus(1);
    await mcDonald.addMenus(2);
    await curryHouse.addMenus(3);
    await curryHouse.addMenus(4);
    await mcDonald.addMenus(5);

    //now write the test that each Menu should have a particular Restaurant Id

    const allMenus = await Menus.findAll();
    console.log(allMenus);

    const NYCB = await Menus.findByPk(1);
    const FOF = await Menus.findByPk(2);
    const CC = await Menus.findByPk(3);
    const MC = await Menus.findByPk(4);
    const MP = await Menus.findByPk(5);
    console.log(NYCB.dataValues.restaurantId);

    expect(NYCB.dataValues.restaurantId).toEqual(1);
    expect(FOF.dataValues.restaurantId).toEqual(3);
    expect(CC.dataValues.restaurantId).toEqual(2);
    expect(MC.dataValues.restaurantId).toEqual(2);
    expect(MP.dataValues.restaurantId).toEqual(3);
  });
});
