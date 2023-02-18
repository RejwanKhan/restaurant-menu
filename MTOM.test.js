const { sequelize } = require("./src/connection");
const { Items } = require("./models/Items");
const { Menus } = require("./models/Menus");
const { Courses } = require("./models/Courses");

Menus.belongsToMany(Items, { through: Courses });
Items.belongsToMany(Menus, { through: Courses });

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

beforeEach(async () => {
  await Menus.bulkCreate([
    { title: "Brunch" },
    { title: "Starters" },
    { title: "Main" },
    { title: "Deserts" },
    { title: "Drink" },
  ]);

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
});

afterEach(async () => {
  await sequelize.sync({ force: true });
});

describe("testing Many to Many associations", () => {
  it("testing Many to Many relationship between Menu and Items", async () => {
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

    const course1 = await Courses.findByPk(1);
    const course2 = await Courses.findByPk(2);
    const course3 = await Courses.findByPk(3);
    const course4 = await Courses.findByPk(4);
    const course5 = await Courses.findByPk(5);
    const course6 = await Courses.findByPk(6);
    console.log(course1);

    expect(
      course1.dataValues.MenuId === 1 && course1.dataValues.ItemId === 5
    ).toBeTruthy();

    expect(
      course2.dataValues.MenuId === 2 && course2.dataValues.ItemId === 1
    ).toBeTruthy();

    expect(
      course3.dataValues.MenuId === 3 && course3.dataValues.ItemId === 3
    ).toBeTruthy();

    expect(
      course4.dataValues.MenuId === 3 && course4.dataValues.ItemId === 4
    ).toBeTruthy();

    expect(
      course5.dataValues.MenuId === 5 && course5.dataValues.ItemId === 2
    ).toBeTruthy();

    expect(
      course6.dataValues.MenuId === 4 && course6.dataValues.ItemId === 6
    ).toBeTruthy();
  });
});
