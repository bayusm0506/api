const service = {};

const model = require("../../models");
const query = require("../../models/raw-query");
const status = require("../../helpers/status");
const db = require("../../config/database");
const api = require("./api")

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

    if (data.id) {
        where.id_category = data.id;
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
    let response, where = "where 1=1", replacements = {};

    if (data.month) {
        where += " and extract (month from e.transaction_date) = :month";
        replacements.month = data.month;
    }

    if (data.year) {
        where += " and extract (year from e.transaction_date) = :year";
        replacements.year = data.year;
    }

    if (data.user_id) {
        where += " and e.user_id = :user_id";
        replacements.user_id = data.user_id;
    }

    try {
        await db.query(query.getExpenditure(where), {
            replacements: replacements,
            type: db.QueryTypes.SELECT
        }).then(async (result) => {
            let mappingData = [];

            await Promise.all(result.map(async (val) => {
                let kategori = val.category_id ? await api.getKategori(val.category_id) : "";
                val.ur_kategori = kategori.length > 0 ? kategori[0].name : "";

                mappingData.push(val)
            }))

            mappingData.sort(function (a, b) {
                return parseInt(b.transaction_date) - parseInt(a.transaction_date);
            })

            if (mappingData) {
                response = {
                    code: "01",
                    description: status.description.VIEW,
                    data: mappingData,
                };
            } else {
                response = {
                    code: "01",
                    description: status.description.DATA_NOT_FOUND,
                    data: [],
                };
            }
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
    let response, where = "where 1=1", replacements = {};

    if (data.month) {
        where += " and extract (month from i.transaction_date) = :month";
        replacements.month = data.month;
    }

    if (data.year) {
        where += " and extract (year from i.transaction_date) = :year";
        replacements.year = data.year;
    }

    if (data.user_id) {
        where += " and e.user_id = :user_id";
        replacements.user_id = data.user_id;
    }

    try {
        await db.query(query.getIncome(where), {
            replacements: replacements,
            type: db.QueryTypes.SELECT
        }).then(async (result) => {
            let mappingData = [];

            await Promise.all(result.map(async (val) => {
                let kategori = val.category_id ? await api.getKategori(val.category_id) : "";
                val.ur_kategori = kategori.length > 0 ? kategori[0].name : "";

                mappingData.push(val)
            }))

            mappingData.sort(function (a, b) {
                return new Date(b.transaction_date) - new Date(a.transaction_date);
            })

            if (mappingData) {
                response = {
                    code: "01",
                    description: status.description.VIEW,
                    data: mappingData,
                };
            } else {
                response = {
                    code: "01",
                    description: status.description.DATA_NOT_FOUND,
                    data: [],
                };
            }
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