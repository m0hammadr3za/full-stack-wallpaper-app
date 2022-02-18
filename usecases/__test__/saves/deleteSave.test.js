const { ObjectId } = require("mongodb");
const deleteSave = require("../../saves/deleteSave");

const mockSaveId = String(new ObjectId());
const mockUserId = String(new ObjectId());
const mockDB = {
    findAndDeleteUserSave: jest.fn(() => {
        const err = null;
        const save = { wallpaperId: String(new ObjectId()) };
        return [err, save];
    }),
};

describe("delete save", () => {
    it("should return error with status 400 if saveId is not a valid id", async () => {
        const saveId = "1";
        const err = await deleteSave(saveId);
        expect(err).toMatchObject({
            status: 400,
            message: "invalid saveId!",
        });
    });

    it("should return error with status 404 if user save doesn't exist", async () => {
        const db = {
            findAndDeleteUserSave: jest.fn(() => {
                const err = null;
                const save = null;
                return [err, save];
            }),
        };
        const err = await deleteSave(mockSaveId, mockUserId, db);
        expect(err).toMatchObject({
            status: 404,
            message: expect.stringMatching(/.*(save).*(doesn't exist).*/gi),
        });
    });

    it("should return null as error if the operation was successfull", async () => {
        const err = await deleteSave(mockSaveId, mockUserId, mockDB);
        expect(err).toBeNull();
    });
});
