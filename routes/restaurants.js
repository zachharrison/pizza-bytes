/*
 * All routes for restaurants are defined here
 * Since this file is loaded in server.js into api/restaurants,
 *   these routes are mounted onto /restaurants
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const { helpers } = require("../db/query-scripts/queryMethods.js");

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM restaurants`;
    console.log(query);
    db.query(query)
      .then((data) => {
        const result = data.rows;
        res.json({ result });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.get("/login", (req, res) => {
    let query = `SELECT * FROM restaurants`;
    console.log(query);
    db.query(query)
      .then((data) => {
        const result = data.rows;
        res.json({ result });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.get("/orders", (req, res) => {
    db.query(helpers.getAllOrders())
      .then((data) => {
        const result = data.rows;
        res.render("orders", { result });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.message });
      });
  });
  router.get("/orders/:id", (req, res) => {
    let id = req.params.id;
    db.query(
      `SELECT quantity, orders.id, menu_items.price, menu_items.name AS pizza_name, sizes.name AS size, order_items.id AS order_id
      FROM order_items
      JOIN orders ON orders.id = order_id
      JOIN menu_items ON menu_item_id = menu_items.id
      JOIN sizes ON sizes.id = size_id
      WHERE orders.id = 1;`
    )
      .then((data) => {
        const result = data.rows;
        console.log("========================>", result);
        console.log("RESULT IS:", result);
        console.log("RESULT ID r, ", result[0].id);
        res.render("orders-id", { result });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.message });
      });
  });
  router.get("/login", (req, res) => {
    let query = `SELECT * FROM restaurants`;
    console.log(query);
    db.query(query)
      .then((data) => {
        const result = data.rows;
        res.json({ result });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/menu", (req, res) => {
    let query = `SELECT * FROM restaurants`;
    console.log(query);
    db.query(query)
      .then((data) => {
        const result = data.rows;
        res.json({ result });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.get("/menu/:id", (req, res) => {
    let query = `SELECT * FROM restaurants`;
    console.log(query);
    db.query(query)
      .then((data) => {
        const result = data.rows;
        res.json({ result });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.get("/customers", (req, res) => {
    let query = `SELECT * FROM restaurants`;
    console.log(query);
    db.query(query)
      .then((data) => {
        const result = data.rows;
        res.json({ result });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.get("/customers/:id", (req, res) => {
    let query = `SELECT * FROM restaurants`;
    console.log(query);
    db.query(query)
      .then((data) => {
        const result = data.rows;
        res.json({ result });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.post("/login", (req, res) => {
    let query = `SELECT * FROM restaurants`;
    console.log(query);
    db.query(query)
      .then((data) => {
        const result = data.rows;
        res.json({ result });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.post("/menu", (req, res) => {
    let query = `SELECT * FROM restaurants`;
    console.log(query);
    db.query(query)
      .then((data) => {
        const result = data.rows;
        res.json({ result });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.post("/menu/:id", (req, res) => {
    let query = `SELECT * FROM restaurants`;
    console.log(query);
    db.query(query)
      .then((data) => {
        const result = data.rows;
        res.json({ result });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.delete("/user/menu/:id", (req, res) => {
    let query = `SELECT * FROM restaurants`;
    console.log(query);
    db.query(query)
      .then((data) => {
        const result = data.rows;
        res.json({ result });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
