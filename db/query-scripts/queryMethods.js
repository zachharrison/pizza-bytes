const helpers = {
  getMenu: function() {
    return `SELECT * FROM menu_items;`;
  },
  getMenu2pt0: function() {
    return `SELECT photo_url, menu_items.name AS pizza_name, menu_items.price AS menu_price, toppings.name AS topping_name, topping_categories.price AS topping_price, toppings.topping_category_id as ID
    FROM menu_items
    LEFT JOIN menu_item_toppings ON menu_items.id = menu_item_id
    LEFT JOIN toppings ON menu_item_toppings.topping_id = toppings.id
    LEFT JOIN topping_categories ON topping_category_id = topping_categories.id;`;
  },
  getMenuItemFromId: function() {
    return `SELECT * FROM menu_items WHERE id = $1;`;
  },
  getToppings: function() {
    return `SELECT * toppings;`;
  },
  getCatTopping: function() {
    return `SELECT * FROM toppings;`;
  },
  getToppingFromId: function() {
    return `SELECT * FROM toppings WHERE id = $1;`;
  },
  getPizzasInOrder: function() {
    return (
      `SELECT quantity, menu_items.price, menu_items.name AS pizza_name, sizes.name AS size, order_items.id AS order_id
      FROM order_items
      JOIN orders ON orders.id = order_id
      JOIN menu_items ON menu_item_id = menu_items.id
      JOIN sizes ON sizes.id = size_id
      WHERE orders.id = $1;`
    );
  },
  countPizzasInOrder: function() {
    return (
      `SELECT sum(quantity)
      FROM order_items
      JOIN orders ON orders.id = order_id
      WHERE orders.id = $1;`
    );
  },
  sumOfPizzasInOrder: function() {
    return (
      `SELECT sum(price * quantity)
      FROM order_items
      JOIN orders ON orders.id = order_id
      JOIN menu_items ON menu_item_id = menu_items.id
      WHERE orders.id = $1`
    );
  },
  getToppingsOnOrderItem: function() {
    return (
      `SELECT menu_items.name, toppings.name, topping_categories.price
      FROM menu_items
      JOIN order_items ON menu_item_id = menu_items.id
      JOIN order_item_toppings on order_item_id = order_items.id
      JOIN toppings ON topping_id = toppings.id
      JOIN topping_categories ON topping_category_id = topping_categories.id
      WHERE order_items.id = $1;`
    );
  },
  sumToppingsOnOrderItem: function() {
    return (
      `SELECT sum(topping_categories.price)
      FROM menu_items
      JOIN order_items ON menu_item_id = menu_items.id
      JOIN order_item_toppings on order_item_id = order_items.id
      JOIN toppings ON topping_id = toppings.id
      JOIN topping_categories ON topping_category_id = topping_categories.id
      WHERE order_items.id = $1;`
    );
  },
  sumToppingsOnWholeOrder: function() {
    return (
      `SELECT sum(topping_categories.price)
      FROM menu_items
      JOIN order_items ON menu_item_id = menu_items.id
      JOIN orders ON orders.id = order_id
      JOIN order_item_toppings on order_item_id = order_items.id
      JOIN toppings ON topping_id = toppings.id
      JOIN topping_categories ON topping_category_id = topping_categories.id
      WHERE orders.id = $1;`
    );
  },
  getAllOrders: function() {
    return `SELECT orders.*, customers.name, customers.phone_number
    FROM orders
    JOIN customers ON customer_id = customers.id
    ORDER BY pickup_time;`;
  },
};

module.exports = { helpers };
