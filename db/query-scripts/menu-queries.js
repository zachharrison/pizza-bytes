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
  const result = {};
  for (const row of rows) {
    const name = row.pizza_name;
    let pizza = result[name];

    if (!pizza) {
      result[name] = {};
      pizza = result[name];
    }
    pizza.name = row.pizza_name;

    if (!pizza.url) {
      pizza.url = row.photo_url;
    }

    if (!pizza.price) {
      pizza.price = row.menu_price;
    }

    if (!pizza.toppings) {
      pizza.toppings = [];
    }
    pizza.toppings.push(row.topping_name);
  }
  console.log(result)
  return result;
}

function pizzaEditor(rows) {
  const result = {};
  for (const row of rows) {
    const ID = row.type;
    let toppingID = result[ID];

    if (!toppingID) {
      result[ID] = [];
      toppingID = result[ID];
    }
     toppingID.push(row.name);

  }
  return result;
}



function test() {
  let message = 'hello world'
  return message
}

module.exports = {
  getProducts,
  getProductById,
  menuBuilder,
  pizzaEditor,
  test
};
/*
{
  1: [mozza, ched, feta],
  2: [meet, meat2, meat3]
  3: [veg1, veg2]
  4: [small]
  5: [med]
  6: [lg]
}

veggies meats, cheeses, sizes
*/
