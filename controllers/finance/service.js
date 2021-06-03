const service = {};

const model = require("../../models");
const status = require("../../helpers/status");

const {
    Op
} = require("sequelize");

// Start Service Category

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

// End Service Category

// Start Service Expenditure

service.getExpenditure = async (data) => {
    let response, where = {};

    if (data.user_id) {
        where.user_id = data.user_id
    }

    try {
        let result = await model.Expenditure.findAll({
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

service.postExpenditure = async (data) => {
    let response;
    try {
        await model.Expenditure.create(data)
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

service.putExpenditure = async (id_expenditure, data) => {
    let response;
    try {
        await model.Expenditure.update(data, {
            where: {
                id_expenditure: id_expenditure
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

service.delExpenditure = async (id_expenditure) => {
    let response;
    try {
        await model.Expenditure.destroy({
            where: {
                id_expenditure: id_expenditure
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

// End Service Expenditure

// Start Service Income

service.getIncome = async (data) => {
    let response, where = {};

    if (data.user_id) {
        where.user_id = data.user_id
    }

    try {
        let result = await model.Income.findAll({
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

service.postIncome = async (data) => {
    let response;
    try {
        await model.Income.create(data)
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

service.putIncome = async (id_income, data) => {
    let response;
    try {
        await model.Income.update(data, {
            where: {
                id_income: id_income
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

service.delIncome = async (id_income) => {
    let response;
    try {
        await model.Income.destroy({
            where: {
                id_income: id_income
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

// End Service Income

module.exports = service;