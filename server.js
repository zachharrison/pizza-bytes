// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const sass = require("node-sass-middleware");

const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const http = require('http');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const moment = require('moment');

// app.post('/sms', (req, res) => {
//   const twiml = new MessagingResponse();

//   console.log(twiml.message('Response from twilio!')) //returns promise once message is sent
//   // .then((message) => console.log(message))
//   res.writeHead(200, { 'Content-Type': 'text/xml' });
//   res.end(twiml.toString());
// })

// http.createServer(app).listen(3000, () => {
//   console.log("http server listening on 3000")
// })
// const MessagingResponse = require('twilio').twiml.MessagingResponse;

// const accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
// const authToken = process.env.TWILIO_TOKEN;   // Your Auth Token from www.twilio.com/console

// const client = require('twilio')(accountSid, authToken, {
//   lazyLoading: true
// });

// client.messages.create({
//   to: '+17788778963',
//   from: '+16042659587',
//   body: `Your order will be ready for pick-up in 30 minutes!`
// })
//   .then((message) => console.log("OUTGOING MESSAGE", message.body))
//   .catch(err => console.log(err))


// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(
//   "/styles",
//   sass({
//     src: __dirname + "/styles",
//     dest: __dirname + "/public/styles",
//     debug: true,
//     outputStyle: "expanded",
//   })
// );
app.use(express.static("public"));
app.use(cookieParser());


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const menuRoutes = require("./routes/menu");
const restaurantsRoutes = require("./routes/restaurants");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/menu", menuRoutes(db));
app.use("/api/restaurants", restaurantsRoutes(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
