/*
 * All routes for Menu are defined here
 * Since this file is loaded in server.js into api/menu,
 *   these routes are mounted onto /menu
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require("express");
const router = express.Router();
const { helpers } = require("../db/query-scripts/queryMethods.js");
/* const { menuBuilder } = require("../db/query-scripts/menu-queries.js"); */

module.exports = (db) => {
  // main menu, shows pizzas with details
  router.get("/", (req, res) => {
    res.render("menu", menuBuilder());
    db.query(helpers.getMenu2pt0())
      .then((data) => {
        const result = menuBuilder(data.rows);
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  // shows the 'selected' menu item and options INSERT into orders
  router.get("/edit", (req, res) => {
    res.render("edit");
    db.query(`SELECT * FROM toppings;`)
      .then((data) => {
        const result = data.rows;
        res.json({ result });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  // see and remove orders item
  // option to edit => get'/edit'
  router.get("/cart", (req, res) => {
    db.query(helpers.getPizzasInOrder(), ["1"])
      .then((data) => {
        const result = data.rows;
        console.log("result: pizza orders", result);
        res.render("cart", { result });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.message });
      });
  });
  // checkout confirmation
  router.get("/checkout", (req, res) => {
    db.query(`SELECT * FROM orders;`)
      .then((data) => {
        const result = data.rows;
        res.render("checkout", { result });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  // option to chng_quantity/remove => post'/cart'
  router.post("/cart", (req, res) => {
    db.query(`SELECT * FROM order_items;`)
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
