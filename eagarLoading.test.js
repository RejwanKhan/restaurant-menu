const { sequelize } = require("./src/connection");
const { Items } = require("./models/Items");
const { Menus } = require("./models/Menus");
const { Courses } = require("./models/Courses");

Menus.belongsToMany(Items, { through: Courses });
Items.belongsToMany(Menus, { through: Courses });

beforeEach(async () => {
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

describe("Testing Eagar Loading with Many to Many association", () => {
  it("testing eagar Loading between Menu and Items", async () => {
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

    //Get all Menus

    const firstMenu = await Menus.findByPk(1, { include: [{ model: Items }] });
    const secondMenu = await Menus.findByPk(2, { include: [{ model: Items }] });
    const thirdMenu = await Menus.findByPk(3, { include: [{ model: Items }] });
    const fourthMenu = await Menus.findByPk(4, { include: [{ model: Items }] });
    const fifthMenu = await Menus.findByPk(5, { include: [{ model: Items }] });

    console.log(JSON.stringify(firstMenu.Items[0].name, null, 2));

    expect(firstMenu.Items[0].name).toEqual("French Toast");
    expect(secondMenu.Items[0].name).toEqual("Salad");
    expect(thirdMenu.Items[0].name).toEqual("New York Meat Burger");
    expect(thirdMenu.Items[1].name).toEqual("Chicken Curry");
    expect(fourthMenu.Items[0].name).toEqual("Chocolate Cake");
    expect(fifthMenu.Items[0].name).toEqual("Wine");
  });
});
