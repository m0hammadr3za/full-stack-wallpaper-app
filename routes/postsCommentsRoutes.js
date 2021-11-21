const express = require("express");
const database = require("../services/index");
const validateAuthorization = require("../middlewares/validateAuthorization");

const {
    getUserPostsComments,
    getPostComments,
    createNewPostComment,
    deletePostComment,
} = require("../controllers/postsCommentsControllers");

const router = express.Router();

router.get("/", validateAuthorization, (req, res, next) =>
    getUserPostsComments(req, res, next, database)
);

router.get("/:id", (req, res, next) => getPostComments(req, res, next, database));

router.post("/", validateAuthorization, (req, res, next) =>
    createNewPostComment(req, res, next, database)
);

router.delete("/:id", validateAuthorization, (req, res, next) =>
    deletePostComment(req, res, next, database)
);

module.exports = router;
