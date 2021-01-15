/*
 * All routes for Menu are defined here
 * Since this file is loaded in server.js into api/menu,
 *   these routes are mounted onto /menu
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require("express");
const router = express.Router();
const { helpers } = require("../db/query-scripts/queryMethods.js");
const {
  menuBuilder,
  pizzaEditor,
} = require("../db/query-scripts/menu-queries.js");
const { generateRandomId } = require("../generateRandomId");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_TOKEN; // Your Auth Token from www.twilio.com/console
const client = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
const MessagingResponse = require("twilio").twiml.MessagingResponse;

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(helpers.getMenu2pt0())
      .then((data) => {
        const templateVars = {
          result: menuBuilder(data.rows),
        };
        res.render("menu", templateVars);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.message });
      });
  });

  // shows the 'selected' menu item and options INSERT into orders

  // router.get("/edit", (req, res) => {
  //   db.query(helpers.getToppings2pt0())
  //     .then((data) => {
  //       const templateVars = {
  //         result: pizzaEditor(data.rows),
  //       };
  //       console.log(templateVars);
  //       res.render("edit", templateVars);
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });
  // });

  router.get("/edit/:name", (req, res) => {
    const cart = req.cookies["cart"];
    const cartId = req.cookies["cartId"];

    db.query(helpers.getToppings2pt0())
      .then((data) => {
        const templateVars = {
          result: pizzaEditor(data.rows),
          cart: req.cookies["cart"],
          selectedPizza: req.params.name,
          pizzaArr: Object.values(cart[cartId].pizzas),
        };

        res.render("edit-name", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/complete", (req, res) => {
    req.cookies["cartId"] = null;
    req.cookies["cart"] = null;

    res.render("complete");
  });

  router.get("/complete", (req, res) => {
    res.render("complete");
  });

  router.get("/cart", (req, res) => {
    const cart = req.cookies["cart"];
    const cartId = req.cookies["cartId"];
    const pizzaArr = Object.values(cart[cartId].pizzas);

    res.render("cart", { pizzaArr });
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

  // checkout confirmation
  router.post("/checkout", (req, res) => {
    const cart = req.cookies["cart"];
    const cartId = req.cookies["cartId"];
    const pizzaArr = Object.values(cart[cartId].pizzas);

    console.log("THIS IS THE PIZZA ARRAY", pizzaArr);
    console.log("THIS IS THE CART", cart);
    res.render("checkout", { pizzaArr });

    // res.render('checkout')
    client.messages
      .create({
        to: "+17788778963",
        from: "+16042659587",
        body: `Your order will be ready for pick-up in 30 minutes!`,
      })
      .then((message) => console.log("OUTGOING MESSAGE", message.body))
      .catch((err) => console.log(err));

    // db.query(`
    // INSERT INTO orders ( customer_id, restaurant_id)
    // VALUES ( $1, $2 ) RETURNING *
    // ;`, [1, 1])
    //   .then((data) => {
    //     console.log(data.rows);
    //     const promises = [];
    //     for (let pizza of parseCart.pizzas) {
    //       const query = `INSERT INTO order_items ( order_id, menu_item_id, quantity)
    //       VALUES ( $1, $2, $3);`;
    //       const promise = db.query(query, [data.rows[0].menuId, pizza.menuId, pizza.quantity]);
    //       promises.push(promise);
    //     }
    //     Promise.all(promises).then(() => {
    //       res.send("ok");
    //     });
  });

  router.post("/edit", (req, res) => {
    db.query(helpers.getDefaultToppings(), [req.body.pizza]).then((data) => {
      const defaultToppings = data.rows;
      const menuId = data.rows[0].pizza_id;
      const menuUrl = data.rows[0].url;
      let defaultPrice;

      if (data.rows.length) {
        defaultPrice = data.rows[0].default_price;
      } else {
        defaultPrice = 900;
      }

      pizzaId = generateRandomId();

      const pizza = {
        id: pizzaId,
        menuId,
        url: menuUrl,
        name: req.body.pizza,
        size: "small",
        toppings: defaultToppings.map((topping) => topping.name),
        price: defaultPrice,
      };

      /*
        IF USER ALREADY HAS A CART IN THEIR COOKIES, USE THE EXISTING CART
        OTHERWISE CREATE A CART AND STORE THE CART ID AND THE
        CART ITSELF AS COOKIES IN THE BROWSER
      */
      if (req.cookies["cartId"]) {
        cart = req.cookies["cart"];
        cart[req.cookies["cartId"]]["pizzas"].push(pizza);

        res.cookie("cart", cart);
      } else {
        cartId = generateRandomId();

        cart = {};
        cart[cartId] = {};

        const pizzas = [];
        pizzas.push(pizza);

        cart[cartId]["pizzas"] = pizzas;

        res.cookie("cartId", cartId);
        res.cookie("cart", cart);
      }

      res.redirect(`/api/menu/edit/${req.body.pizza}`);
    });
  });

  router.post("/cart", (req, res) => {
    const cartId = req.cookies["cartId"];
    const cart = req.cookies["cart"];

    const pizzaIndex = cart[cartId]["pizzas"].length - 1;
    const pizzaName = cart[cartId]["pizzas"][pizzaIndex]["name"];

    const chosenToppings = req.body.topping;
    const chosenSize = req.body.size;

    db.query(helpers.getNotDefaultToppings(), [pizzaName]).then((data) => {
      const result = data.rows;

      cart[cartId]["pizzas"][pizzaIndex]["toppings"] = chosenToppings;
      cart[cartId].pizzas[cart[cartId].pizzas.length - 1].size = chosenSize;

      for (const topping of result) {
        if (chosenToppings.includes(topping.name)) {
          cart[cartId].pizzas[cart[cartId].pizzas.length - 1].price +=
            topping.price;
        }
      }

      res.cookie("cart", cart);
      res.redirect("/api/menu/cart");
    });
  });
  return router;
};
