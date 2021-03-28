const helpers = {};

helpers.normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

helpers.generateToken = () => {
  return require("crypto").randomBytes(64).toString("hex");
};

module.exports = helpers;
