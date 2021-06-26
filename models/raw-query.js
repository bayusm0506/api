const query = {};

query.getExpenditure = (where) => {
    return `select e.id as id_expenditure, e.transaction_date, e.amount, e.detail, e.category_id, e.user_id, e.created_at, e.updated_at ` +
        `from myapp_khas.expenditure e ` +
        `${where}`;
}

query.getIncome = (where) => {
    return `select i.id as id_income, i.transaction_date, i.amount, i.detail, i.category_id, i.user_id, i.created_at, i.updated_at ` +
        `from myapp_khas.income i ` +
        `${where}`;
}

module.exports = query;