const Sequelize = require("sequelize");
const Moment = require("moment");
const DB = require("../../config/database");

const Users = DB.define(
  "Users",
  {
    id_user: {
      type: Sequelize.BIGINT,
      field: "id",
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING(50),
      field: "username",
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(100),
      field: "password",
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(255),
      field: "email",
      allowNull: false,
    },
    created_at: {
      type: "TIMESTAMP",
      field: "created_at",
      allowNull: true,
      get() {
        return Moment(this.getDataValue("created_at")).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      },
    },
    updated_at: {
      type: "TIMESTAMP",
      field: "updated_at",
      allowNull: true,
      get() {
        return Moment(this.getDataValue("updated_at")).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      },
    },
    last_login: {
      type: "TIMESTAMP",
      field: "last_login",
      allowNull: true,
      get() {
        return Moment(this.getDataValue("last_login")).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      },
    },
    token: {
      type: Sequelize.STRING(200),
      field: "token",
      allowNull: false,
    },
  },
  {
    schema: "myapp_khas",
    tableName: "users",
    timestamps: false,
  }
);

Users.removeAttribute("id");

module.exports = Users;
