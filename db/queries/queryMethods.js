module.exports = {
  getMenu: function () {
    return pool
      .query(`SELECT * FROM menu_items;`)
      .then((res) => {
        res.rows;
      })
      .catch((err) => err);
  },
  getMenuItemFromId: function (id) {
    return pool
      .query(`SELECT * FROM menu_items WHERE id = $1;`, [id])
      .then((res) => {
        res.rows[0];
      })
      .catch((err) => err);
  },
  getToppings: function () {
    return pool
      .query(`SELECT * toppings;`)
      .then((res) => {
        res.rows;
      })
      .catch((err) => err);
  },
  getToppingFromId: function (id) {
    return pool
      .query(`SELECT * FROM toppings WHERE id = $1;`, [id])
      .then((res) => {
        res.rows[0];
      })
      .catch((err) => err);
  },
  getToppingFromId: function (id) {
    return pool
      .query(`SELECT * FROM toppings WHERE id = $1;`, [id])
      .then((res) => {
        res.rows[0];
      })
      .catch((err) => err);
  },
  getPizzasInOrder: function (id) {
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
  },
  countPizzasInOrder:function (id) {
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
  },
  sumOfPizzasInOrder: function (id) {
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
  },
  getToppingsOnOrderItem: function (id) {
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
  },
  sumToppingsOnOrderItem = function (id) {
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
  },
  sumToppingsOnWholeOrder = function (id) {
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
  }
};
