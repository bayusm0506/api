const axios = require('axios').default;
const api = {}

api.getKategori = async (id = "", keyword = "") => {
    return await axios.get(process.env.API_BAYUSM + "finance/kategori", {
        params: {
            id: id,
            category_name: keyword
        }
    }).then((response) => response.data.data)
}

module.exports = api