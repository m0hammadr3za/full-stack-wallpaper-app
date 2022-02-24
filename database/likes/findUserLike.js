const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getLikesCollection = () => getDatabase().collection("likes");

async function findUserLike(wallpaperId, userId) {
    let error, like;

    try {
        like = await getLikesCollection().findOne({
            wallpaperId: new ObjectId(wallpaperId),
            userId: new ObjectId(userId),
        });

        error = null;
    } catch (err) {
        error = err;
        like = null;
    }

    return [error, like];
}

module.exports = findUserLike;
