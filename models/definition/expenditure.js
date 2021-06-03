const Sequelize = require("sequelize");
const Moment = require("moment");
const DB = require("../../config/database");

const Expenditure = DB.define(
    "Expenditure",
    {
        id_expenditure: {
            type: Sequelize.BIGINT,
            field: "id",
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        transaction_date: {
            type: Sequelize.DATE,
            field: "transaction_date",
            allowNull: false,
        },
        amount: {
            type: Sequelize.INTEGER,
            field: "amount",
            allowNull: true,
        },
        detail: {
            type: Sequelize.STRING(50),
            field: "detail",
            allowNull: true,
        },
        category_id: {
            type: Sequelize.BIGINT,
            field: "category_id",
            allowNull: false,
        },
        user_id: {
            type: Sequelize.BIGINT,
            field: "user_id",
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
    },
    {
        schema: "myapp_khas",
        tableName: "expenditure",
        timestamps: false,
    }
);

Expenditure.removeAttribute("id");

module.exports = Expenditure;
