const Sequelize = require("sequelize");
const DB = require("../../config/database");

const Category = DB.define(
  "Category",
  {
    id_category: {
      type: Sequelize.BIGINT,
      field: "id",
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      field: "name",
      allowNull: false,
    },
  },
  {
    schema: "myapp_khas",
    tableName: "category",
    timestamps: false,
  }
);

Category.removeAttribute("id");

module.exports = Category;
