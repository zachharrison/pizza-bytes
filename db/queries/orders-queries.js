const db = require('../../db');

const getOrders = () => {
  return db.query('SELECT * FROM orders;')
    .then((response) => {
      return response.rows;
    });
};

module.exports = {
  getOrders,
  getProductById
};
