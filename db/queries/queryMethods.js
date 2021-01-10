// view entire menu
const getMenu = function () {
  return pool
    .query(`SELECT * FROM menu_items;`)
    .then((res) => {
      res.rows;
    })
    .catch((err) => err);
};

// view specific menu item from ID
const getMenuItemFromId = function (id) {
  return pool
    .query(`SELECT * FROM menu_items WHERE id = $1;`, [id])
    .then((res) => {
      res.rows[0];
    })
    .catch((err) => err);
};

// view all toppings
const getMenu = function () {
  return pool
    .query(`SELECT * toppings;`)
    .then((res) => {
      res.rows;
    })
    .catch((err) => err);
};

// view specific topping
const getToppingFromId = function (id) {
  return pool
    .query(`SELECT * FROM toppings WHERE id = $1;`, [id])
    .then((res) => {
      res.rows[0];
    })
    .catch((err) => err);
};

//  view all pizzas in an order (no toppings)
const getPizzasInOrder = function (id) {
  return pool
    .query(
      `SELECT quantity, menu_items.price, menu_items.name, sizes.name, order_items.id AS order_id
    FROM order_items
    JOIN orders ON orders.id = order_id
    JOIN menu_items ON menu_item_id = menu_items.id
    JOIN sizes ON sizes.id = size_id
    WHERE orders.id = $1;`,
      [id]
    )
    .then((res) => {
      res.rows;
    })
    .catch((err) => err);
};

// -- count of pizzas in an order
const countPizzasInOrder = function (id) {
  return pool
    .query(
      `SELECT sum(quantity)
    FROM order_items
    JOIN orders ON orders.id = order_id
    WHERE orders.id = $1;`,
      [id]
    )
    .then((res) => {
      res.rows[0];
    })
    .catch((err) => err);
};

// -- price of pizzas in an order
const sumOfPizzasInOrder = function (id) {
  return pool
    .query(
      `SELECT sum(price * quantity)
    FROM order_items
    JOIN orders ON orders.id = order_id
    JOIN menu_items ON menu_item_id = menu_items.id
    WHERE orders.id = $1`,
      [id]
    )
    .then((res) => {
      res.rows[0];
    })
    .catch((err) => err);
};

// -- toppings on a pizza w price
const getToppingsOnOrderItem = function (id) {
  return pool
    .query(
      `SELECT menu_items.name, toppings.name, topping_categories.price
    FROM menu_items
    JOIN order_items ON menu_item_id = menu_items.id
    JOIN order_item_toppings on order_item_id = order_items.id
    JOIN toppings ON topping_id = toppings.id
    JOIN topping_categories ON topping_category_id = topping_categories.id
    WHERE order_items.id = $1;`,
      [id]
    )
    .then((res) => {
      res.rows;
    })
    .catch((err) => err);
};

// -- sum of topping prices on pizza
const sumToppingsOnOrderItem = function (id) {
  return pool
    .query(
      `SELECT sum(topping_categories.price)
    FROM menu_items
    JOIN order_items ON menu_item_id = menu_items.id
    JOIN order_item_toppings on order_item_id = order_items.id
    JOIN toppings ON topping_id = toppings.id
    JOIN topping_categories ON topping_category_id = topping_categories.id
    WHERE order_items.id = $1;`,
      [id]
    )
    .then((res) => {
      res.rows[0];
    })
    .catch((err) => err);
};

// -- sum of topping prices on WHOLE ORDER
const sumToppingsOnWholeOrder = function (id) {
  return pool
    .query(
      `SELECT sum(topping_categories.price)
    FROM menu_items
    JOIN order_items ON menu_item_id = menu_items.id
    JOIN orders ON orders.id = order_id
    JOIN order_item_toppings on order_item_id = order_items.id
    JOIN toppings ON topping_id = toppings.id
    JOIN topping_categories ON topping_category_id = topping_categories.id
    WHERE orders.id = $1;`,
      [id]
    )
    .then((res) => {
      res.rows[0];
    })
    .catch((err) => err);
};
