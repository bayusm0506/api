const service = {};

const model = require("../../models");
const status = require("../../helpers/status");

const {
    Op
} = require("sequelize");

service.getCategory = async (data) => {
    let response, where = {};

    if (data.category_name) {
        where.name = {
            [Op.iLike]: '%' + data.category_name + '%'
        }
    }
    try {
        let result = await model.Category.findAll({
            raw: true,
            where: where
        });

        if (result) {
            response = {
                code: "01",
                description: status.description.VIEW,
                data: result,
            };
        } else {
            response = {
                code: "01",
                description: status.description.DATA_NOT_FOUND,
                data: [],
            };
        }
    } catch (error) {
        // Error
        response = {
            code: "02",
            description: JSON.stringify(error),
        };
    }

    return response;
};

service.postCategory = async (data) => {
    let response;
    try {
        await model.Category.create(data)
            .then((ress) => {
                response = {
                    code: "01",
                    description: status.description.CREATE,
                    data: data,
                };
            }).catch((error) => {
                response = {
                    code: "02",
                    description: status.description.INSERT_FAILED,
                    data: [],
                };
            });
    } catch (error) {
        // Error
        response = {
            code: "02",
            description: JSON.stringify(error),
        };
    }

    return response;
};

service.putCategory = async (id_category, data) => {
    let response;
    try {
        await model.Category.update(data, {
            where: {
                id_category: id_category
            }
        })
            .then((ress) => {
                response = {
                    code: "01",
                    description: status.description.UPDATE,
                    data: data,
                };
            }).catch((error) => {
                response = {
                    code: "02",
                    description: status.description.UPDATE_FAILED,
                    data: [],
                };
            });
    } catch (error) {
        // Error
        response = {
            code: "02",
            description: JSON.stringify(error),
        };
    }

    return response;
};

service.delCategory = async (id_category) => {
    let response;
    try {
        await model.Category.destroy({
            where: {
                id_category: id_category
            }
        }).then((result) => {
            response = {
                code: "01",
                description: status.description.DELETE,
                data: {},
            };
        })
    } catch (error) {
        // Error
        response = {
            code: "02",
            description: JSON.stringify(error),
        };
    }

    return response;
};

module.exports = service;