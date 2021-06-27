const moment = require("moment");
const numeral = require("numeral");

const service = {};

const model = require("../../models");
const query = require("../../models/raw-query");
const status = require("../../helpers/status");
const db = require("../../config/database");
const api = require("./api")

const {
    Op, Sequelize
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
            let mappingData = [], mappingDataReal = [];

            await Promise.all(result.map(async (val, i) => {
                let kategori = val.category_id ? await api.getKategori(val.category_id) : "";
                val.ur_kategori = kategori.length > 0 ? kategori[0].name : "";

                mappingData.push(val)
            }))

            mappingData.sort(function (a, b) {
                return new Date(b.transaction_date) - new Date(a.transaction_date);
            })

            mappingData.map((val, i) => {
                val.no = i + 1;

                mappingDataReal.push(val)
            })

            if (mappingDataReal) {
                response = {
                    code: "01",
                    description: status.description.VIEW,
                    data: mappingDataReal,
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
            let mappingData = [], mappingDataReal = [];

            await Promise.all(result.map(async (val) => {
                let kategori = val.category_id ? await api.getKategori(val.category_id) : "";
                val.ur_kategori = kategori.length > 0 ? kategori[0].name : "";

                mappingData.push(val)
            }))

            mappingData.sort(function (a, b) {
                return new Date(b.transaction_date) - new Date(a.transaction_date);
            })

            mappingData.map((val, i) => {
                val.no = i + 1;

                mappingDataReal.push(val)
            })

            if (mappingDataReal) {
                response = {
                    code: "01",
                    description: status.description.VIEW,
                    data: mappingDataReal,
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

// Start Service Rekapitulasi

service.getRekapitulasi = async (data) => {
    let response, mappingExpenditure = [], mappingIncome = [], total_expenditure = 0, total_income = 0;

    try {
        let labelExpenditure = [], datamapExpenditure = [];
        await model.Expenditure.findAll({
            raw: true,
            attributes: [
                'transaction_date',
                [Sequelize.fn('sum', Sequelize.col('amount')), 'amount'],
            ],
            where: {
                transaction_date: {
                    [Op.between]: [data.start_date, data.end_date]
                }
            },
            group: ['transaction_date'],
            order: [['transaction_date', 'ASC']]
        }).then(async (result) => {
            result.map((val) => {
                labelExpenditure.push(moment(val.transaction_date).format("DD/MM/YYYY"));
                datamapExpenditure.push(numeral(val.amount).format("0,0"));
            })
        });

        await model.Expenditure.findAll({
            raw: true,
            attributes: [
                'category_id',
                [Sequelize.fn('sum', Sequelize.col('amount')), 'amount'],
            ],
            where: {
                transaction_date: {
                    [Op.between]: [data.start_date, data.end_date]
                }
            },
            group: ['category_id'],
        }).then(async (result) => {
            await Promise.all(result.map(async (val) => {
                let kategori = val.category_id ? await api.getKategori(val.category_id) : "";
                val.ur_kategori = kategori.length > 0 ? kategori[0].name : "";

                total_expenditure = total_expenditure + parseInt(val.amount);
                mappingExpenditure.push(val);
            }))
        });

        await model.Income.findAll({
            raw: true,
            attributes: [
                'category_id',
                [Sequelize.fn('sum', Sequelize.col('amount')), 'amount'],
            ],
            where: {
                transaction_date: {
                    [Op.between]: [data.start_date, data.end_date]
                }
            },
            group: ['category_id'],
        }).then(async (result) => {
            await Promise.all(result.map(async (val) => {
                let kategori = val.category_id ? await api.getKategori(val.category_id) : "";
                val.ur_kategori = kategori.length > 0 ? kategori[0].name : "";

                total_income = total_income + parseInt(val.amount);
                mappingIncome.push(val)
            }))
        });

        response = {
            code: "01",
            description: status.description.VIEW,
            data: {
                total_expenditure: total_expenditure,
                data_expenditure: mappingExpenditure,
                total_income: total_income,
                data_income: mappingIncome,
                rest_amount: parseInt(total_income) - parseInt(total_expenditure),
                label_expend: labelExpenditure,
                datamap_expend: datamapExpenditure
            },
        };
    } catch (error) {
        // Error
        response = {
            code: "02",
            description: JSON.stringify(error),
        };
    }

    return response;
}

// End Service Rekapitulasi

module.exports = service;