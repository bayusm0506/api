const Sequelize = require("sequelize");
const DB = require("../../config/database");

const Roles = DB.define(
  "Roles",
  {
    id_role: {
      type: Sequelize.BIGINT,
      field: "id",
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    role_name: {
      type: Sequelize.STRING,
      field: "role_name",
      allowNull: false,
    },
  },
  {
    schema: "myapp_khas",
    tableName: "roles",
    timestamps: false,
  }
);

Roles.removeAttribute("id");

module.exports = Roles;
