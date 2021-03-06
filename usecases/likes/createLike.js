const validateId = require("../../validation/id");

async function createLike(wallpaperId, userId, db) {
    const isValidId = await validateId(wallpaperId);
    if (!isValidId) {
        return {
            known: true,
            status: 400,
            message: "invalid wallpaperId!",
        };
    }

    let [err, wallpaper] = await db.findWallpaperById(wallpaperId);
    if (err) return err;

    if (!wallpaper) {
        return {
            known: true,
            status: 404,
            message: "a wallpaper with this id doesn't exist!",
        };
    }

    let previousLike;
    [err, previousLike] = await db.findUserLike(wallpaperId, userId);
    if (err) return err;

    if (previousLike) {
        return {
            known: true,
            status: 400,
            message: "wallpaper has already been liked!",
        };
    }

    const like = {
        wallpaperId,
        userId,
        createdAt: Date.now(),
    };

    err = await db.saveLike(like);
    if (err) return err;

    err = await db.incrementWallpaperLikeCount(wallpaperId);
    if (err) return err;

    return null;
}

module.exports = createLike;
