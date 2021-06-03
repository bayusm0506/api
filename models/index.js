const model = {};

model.Users = require("./definition/users");
model.UserRole = require("./definition/userRole");
model.Roles = require("./definition/roles");
model.Category = require("./definition/category");
model.Expenditure = require("./definition/expenditure");
model.Income = require("./definition/income");

model.Users.belongsToMany(model.Roles, {
  through: model.UserRole,
  foreignKey: "user_id",
});

model.Roles.belongsToMany(model.Users, {
  through: model.UserRole,
  foreignKey: "role_id",
});

module.exports = model;
