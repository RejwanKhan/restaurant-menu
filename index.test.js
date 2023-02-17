const { sequelize } = require("./src/connection");
const { Restaurants } = require("./models/Restaurant");
const { Menus } = require("./models/Menus");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterEach(async () => {
  await sequelize.sync({ force: true });
});

describe("testing the functionality and relations of ResturantsAndMenus", () => {
  it("testing creating a new Resturant ", async () => {
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
});
