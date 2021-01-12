const db = require('../../db');

const getProducts = () => {
  return db.query('SELECT * FROM products;')
    .then((response) => {
      return response.rows;
    });
};

const getProductById = (id) => {
  return db.query('SELECT * FROM products WHERE id = $1', [id])
    .then((response) => {
      return response.rows[0];
    });
};

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

module.exports = {
  getProducts,
  getProductById,
  menuBuilder
};
