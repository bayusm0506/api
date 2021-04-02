const Sequelize = require("sequelize");
const Moment = require("moment");
const DB = require("../../config/database");

const UserRole = DB.define(
  "UserRole",
  {
    user_id: {
      type: Sequelize.BIGINT,
      field: "user_id",
      allowNull: false,
    },
    role_id: {
      type: Sequelize.BIGINT,
      field: "role_id",
      allowNull: false,
    },
    grant_date: {
      type: "TIMESTAMP",
      field: "grant_date",
      allowNull: true,
      get() {
        return Moment(this.getDataValue("grant_date")).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      },
    },
  },
  {
    schema: "myapp_khas",
    tableName: "user_roles",
    timestamps: false,
  }
);

UserRole.removeAttribute("id");

module.exports = UserRole;
