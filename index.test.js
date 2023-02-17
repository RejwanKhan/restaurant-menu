const { sequelize } = require("./src/connection");
const { Restaurants } = require("./models/Restaurant");
const { Menus } = require("./models/Menus");
const { where } = require("sequelize");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterEach(async () => {
  await sequelize.sync({ force: true });
});

describe("testing the functionality and relations of ResturantsAndMenus", () => {
  it("testing creating a new Resturant instance ", async () => {
    await Restaurants.create({
      name: "BurgerKing",
      location: "NewYork",
      cuisine: "American",
    });

    const BurgerKing = await Restaurants.findOne({
      where: { name: "BurgerKing" },
    });
    expect(BurgerKing.name).toBe("BurgerKing");
  });

  it("can create a new Menu instance", async () => {
    await Menus.create({ title: "Wines" });

    const menu1 = await Menus.findOne({ where: { title: "Wines" } });

    expect(menu1.title).toEqual("Wines");
  });

  // Test finding restaurants and menus

  it("finding restaurants", async () => {
    await Restaurants.bulkCreate([
      { name: "BurgerKing", location: "NewYork", cuisine: "American" },
      { name: "CurryHouse", location: "Bangladesh", cuisine: "Asian" },
      { name: "SushiKing", location: "China", cuisine: "Chinese" },
    ]);

    const secondRestaurant = await Restaurants.findByPk(2);
    expect(secondRestaurant.location).toBe("Bangladesh");
  });

  it("can find Menus", async () => {
    await Menus.bulkCreate([
      { title: "Wines" },
      { title: "Brunch" },
      { title: "FastFood" },
      { title: "Vegan" },
    ]);

    const vegan = await Menus.findOne({ where: { title: "Vegan" } });
    expect(vegan.title).toEqual("Vegan");
  });

  it("can delete menus", async () => {
    await Menus.bulkCreate([
      { title: "Wines" },
      { title: "Brunch" },
      { title: "FastFood" },
      { title: "Vegan" },
    ]);

    await Menus.destroy({ where: { title: "FastFood" } });
    const fastFood = await Menus.findOne({ where: { title: "FastFood" } });
    expect(fastFood).toBeFalsy();
  });

  it("test restaurant has rating Property", async () => {
    await Restaurants.bulkCreate([
      { name: "Pizza Hut", location: "London", cuisine: "Italian", rating: 5 },
      {
        name: "FishAndChips",
        location: "London",
        cuisine: "British",
        rating: 7,
      },
    ]);
    const FishAndChips = await Restaurants.findByPk(2);
    expect(FishAndChips.rating).toEqual(7);
  });
});
