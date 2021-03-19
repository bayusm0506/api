const express = require("express");
const bodyParser = require("body-parser");
const app = express();

require("dotenv").config();

const helpers = require("./helpers");

const port = helpers.normalizePort(process.env.PORT || "3000");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

module.exports = app;
