const express = require("express");
const authenticateUser = require("../middleware/authenticateUser");
const deleteUser = require("../usecases/users/deleteUser");

const router = express.Router();

router.delete("/", authenticateUser, async (req, res, next) => {
    const user = req.user;
    const password = req.body.password;
    const db = req.database;

    const err = await deleteUser(user, password, db);
    if (err) return next(err);

    return res.json({ success: true });
});

module.exports = router;
