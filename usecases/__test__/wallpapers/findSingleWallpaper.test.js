const { ObjectId } = require("mongodb");
const findSingleWallpaper = require("../../wallpapers/findSingleWallpaper");

const mockId = String(new ObjectId());
const mockDB = {
    findWallpaperById: jest.fn(() => {
        const err = null;
        const wallpaper = { title: "my wallpaper" };
        return [err, wallpaper];
    }),
};

describe("find single wallpaper", () => {
    it("should return error with status 400 if wallpaper id is not a valid id", async () => {
        const invalidId = "123456789";
        const [err, wallpaper] = await findSingleWallpaper(invalidId);
        expect(err).toMatchObject({
            status: 400,
            message: "invalid wallpaper id!",
        });
    });

    it("should return error with status 404 if there is no post with related id in the database", async () => {
        const db = {
            findWallpaperById: jest.fn(() => {
                const err = null;
                const wallpaper = null;
                return [err, wallpaper];
            }),
        };
        const [err, wallpaper] = await findSingleWallpaper(mockId, db);
        expect(err).toMatchObject({
            status: 404,
            message: expect.stringMatching(
                /.*(wallpaper).*(doesn't exist).*/gi
            ),
        });
    });

    it("should return null as error if the operation was successfull", async () => {
        const [err, wallpaper] = await findSingleWallpaper(mockId, mockDB);
        expect(err).toBeNull();
    });
});