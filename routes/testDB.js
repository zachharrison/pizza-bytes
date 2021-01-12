// this can be deleted once menu works
// this can be deleted once menu works

const ENV = process.env.ENV || "development";
const { Pool } = require("pg");

const dbParams = {
  host: 'localhost',
  port: 5432,
  user: 'labber',
  password: 'labber',
  database: 'midterm',
};

// this can be deleted once menu works
// this can be deleted once menu works

const db = new Pool(dbParams);
const { helpers } = require("../db/query-scripts/queryMethods.js");
db.connect();

db.query(helpers.getMenu2pt0())
  .then((data) => {
    const result = menuBuilder(data.rows);
    console.log(result)
  })
  .catch((err) => {
    console.error(err);
  });


function menuBuilder(rows) {
  const result = {}
  for (const row of rows) {
    const name= row.pizza_name
    console.log(name);
    let pizza = result[name]

    if (!pizza){
      result[name] = {}
      pizza = result[name]
    }
    pizza.name = row.pizza_name

    if (!pizza.toppings) {
      pizza.toppings = []
    }
    pizza.toppings.push(row.topping_name)

    if (!pizza.price){
      pizza.price = 0; //row.pizza_price
    }
    pizza.price += row.menu_price //row.topping_price
  }
  return result;
}
