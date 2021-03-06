const validateId = require("../../validation/id");

async function deleteWallpaper(wallpaperId, userId, db) {
    const isValidId = await validateId(wallpaperId);
    if (!isValidId) {
        return {
            known: true,
            status: 400,
            message: "invalid wallpaperId!",
        };
    }

    const [err, success] = await db.findAndDeleteUserWallpaper(
        wallpaperId,
        userId
    );
    if (err) return err;

    if (!success) {
        return {
            known: true,
            status: 404,
            message: "a wallpaper with this id, for this user, doesn't exist!",
        };
    }

    return null;
}

module.exports = deleteWallpaper;
