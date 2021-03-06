const validateId = require("../../validation/id");

async function findSingleWallpaper(wallpaperId, userId, db) {
    const isValidId = await validateId(wallpaperId);
    if (!isValidId) {
        const knownError = {
            known: true,
            status: 400,
            message: "invalid wallpaperId!",
        };

        return [knownError, null];
    }

    const [err, wallpaper] = await db.findWallpaperById(wallpaperId, userId);
    if (err) return [err, null];

    if (!wallpaper) {
        const knownError = {
            known: true,
            status: 404,
            message: "a wallpaper with this id doesn't exist!",
        };

        return [knownError, null];
    }

    return [null, wallpaper];
}

module.exports = findSingleWallpaper;
