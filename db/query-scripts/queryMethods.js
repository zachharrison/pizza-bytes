const helpers = {
  getMenu: function () {
    return `SELECT * FROM menu_items;`;
  },
  getMenuItemFromId: function (id) {
    return `SELECT * FROM menu_items WHERE id = $1;`, [id];
  },
  getToppings: function () {
    return `SELECT * toppings;`;
  },
  getToppingFromId: function (id) {
    return `SELECT * FROM toppings WHERE id = $1;`, [id];
  },
  getToppingFromId: function (id) {
    return `SELECT * FROM toppings WHERE id = $1;`, [id];
  },
  getPizzasInOrder: function (id) {
    return (
      `SELECT quantity, orders.id, menu_items.price, menu_items.name AS pizza_name, sizes.name AS size, order_items.id AS order_id
    FROM order_items
    JOIN orders ON orders.id = order_id
    JOIN menu_items ON menu_item_id = menu_items.id
    JOIN sizes ON sizes.id = size_id
    WHERE orders.id = $1;`,
      [1]
    );
  },
  countPizzasInOrder: function (id) {
    return (
      `SELECT sum(quantity)
      FROM order_items
      JOIN orders ON orders.id = order_id
      WHERE orders.id = $1;`,
      [id]
    );
  },
  sumOfPizzasInOrder: function (id) {
    return (
      `SELECT sum(price * quantity)
      FROM order_items
      JOIN orders ON orders.id = order_id
      JOIN menu_items ON menu_item_id = menu_items.id
      WHERE orders.id = $1`,
      [id]
    );
  },
  getToppingsOnOrderItem: function (id) {
    return (
      `SELECT menu_items.name, toppings.name, topping_categories.price
      FROM menu_items
      JOIN order_items ON menu_item_id = menu_items.id
      JOIN order_item_toppings on order_item_id = order_items.id
      JOIN toppings ON topping_id = toppings.id
      JOIN topping_categories ON topping_category_id = topping_categories.id
      WHERE order_items.id = $1;`,
      [id]
    );
  },
  sumToppingsOnOrderItem: function (id) {
    return (
      `SELECT sum(topping_categories.price)
      FROM menu_items
      JOIN order_items ON menu_item_id = menu_items.id
      JOIN order_item_toppings on order_item_id = order_items.id
      JOIN toppings ON topping_id = toppings.id
      JOIN topping_categories ON topping_category_id = topping_categories.id
      WHERE order_items.id = $1;`,
      [id]
    );
  },
  sumToppingsOnWholeOrder: function (id) {
    return (
      `SELECT sum(topping_categories.price)
      FROM menu_items
      JOIN order_items ON menu_item_id = menu_items.id
      JOIN orders ON orders.id = order_id
      JOIN order_item_toppings on order_item_id = order_items.id
      JOIN toppings ON topping_id = toppings.id
      JOIN topping_categories ON topping_category_id = topping_categories.id
      WHERE orders.id = $1;`,
      [id]
    );
  },
  getAllOrders: function () {
    return `SELECT orders.*, customers.name, customers.phone_number
    FROM orders
    JOIN customers ON customer_id = customers.id
    ORDER BY pickup_time;`;
  },
};

module.exports = { helpers };
