const validateUser = require("../../validation/user");
const hashPassword = require("../../utils/hashPassword");

async function createUser(user, db) {
    let [err, validUser] = await validateUser(user);
    if (err) return { known: true, status: 400, message: err.message };

    let sameUser;
    [err, sameUser] = await db.findUserByEmail(validUser.email);
    if (err) return err;

    if (sameUser) {
        return {
            known: true,
            status: 400,
            message: "a user with this email address already exists!",
        };
    }

    validUser.password = await hashPassword(validUser.password);

    err = await db.saveUser(validUser);
    if (err) return err;

    return null;
}

module.exports = createUser;
