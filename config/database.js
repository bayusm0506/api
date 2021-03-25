var Sequelize = require("sequelize");

const db = new Sequelize(
  process.env.DB_SCEM,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: "+07:00", // for writing to database
    // logging : false,
    logging: console.log,
    pool: {
      max: 5,
      min: 2,
      idle: 20000,
      acquire: 200000,
    },
  }
);

module.exports = db;
