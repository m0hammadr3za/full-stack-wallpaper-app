const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getLikesCollection = () => getDatabase().collection("likes");

async function saveLike(like) {
    let error;

    try {
        await getLikesCollection().insertOne({
            ...like,
            wallpaperId: new ObjectId(like.wallpaperId),
            userId: new ObjectId(like.userId),
        });

        error = null;
    } catch (err) {
        error = err;
    }

    return error;
}

module.exports = saveLike;
