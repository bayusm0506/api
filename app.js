const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const responseTime = require("response-time");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const app = express();

const helpers = require("./helpers");
const status = require("./helpers/status");
const router = require("./routes");

// Adds a X-Response-Time header to responses.
app.use(responseTime());

const port = helpers.normalizePort(process.env.PORT || "3000");

// support parsing of application/json type post data
app.use(bodyParser.json());

// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// Protection
app.use(helmet());

// Handling CORS request
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));

app.use("/mobile", router.mobile);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res
    .status(status.code.bad)
    .json(
      status.response(
        status.code.bad,
        status.message.error,
        "Path Tidak Ditemukan"
      )
    );
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

module.exports = app;
