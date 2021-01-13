/*
 * All routes for restaurants are defined here
 * Since this file is loaded in server.js into api/restaurants,
 *   these routes are mounted onto /restaurants
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { helpers } = require("../db/query-scripts/queryMethods.js");
const {
  menuBuilder,
  pizzaEditor,
} = require("../db/query-scripts/menu-queries.js");

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("rests");
  });
  router.get("/login", (req, res) => {
    res.render("rests-login");
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
    db.query(helpers.getOrderDetails(), [id])
      .then((data) => {
        const result = data.rows;
        const resultObj = {};
        for (let each in result) {
          if (result[each]["order_id"] in resultObj) {
            resultObj[result[each]["order_id"]]["toppings"].push(
              " " + result[each]["topping"]
            );
          } else {
            resultObj[result[each]["order_id"]] = {
              name: result[each]["pizza_name"],
              size: result[each]["size"],
              toppings: [result[each]["topping"]],
            };
          }
        }
        res.render("orders-id", { resultObj, id });
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
    db.query(helpers.getMenu())
      .then((data) => {
        const result = data.rows;
        res.render("rests-menu", { result });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.get("/menu/:id", (req, res) => {
    let id = req.params.id;
    db.query(helpers.getMenuItemFromId(), [id])
      .then((data) => {
        const result = data.rows[0];
        res.render("rests-menu-id", { result });
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
    let id = req.params.id;
    db.query(helpers.getCustomerDetails(), [id])
      .then((data) => {
        const result = data.rows[0];
        res.render("rests-custs-id", { result });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.post("/login", (req, res) => {
    res.redirect("/api/restaurants/menu");
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
    console.log(res.body);
    res.redirect("/api/restaurants/menu");
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
