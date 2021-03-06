const { getDatabase } = require("../../config/mongodb");
const getCategoriesCollection = () => getDatabase().collection("categories");

async function queryCategories(query) {
    let error, categories;

    try {
        const { page, limit } = query;
        const cursor = await getCategoriesCollection()
            .find()
            .sort({ title: 1 })
            .skip(page > 0 ? (page - 1) * limit : 0)
            .limit(limit > 0 ? limit : 10);

        categories = await cursor.toArray();
        error = null;
    } catch (err) {
        error = err;
        categories = null;
    }

    return [error, categories];
}

module.exports = queryCategories;
