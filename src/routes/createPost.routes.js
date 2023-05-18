const { Router } = require("express");
const { createPost, createPostPage } = require("../controllers/createPost.controller");
const tokenMiddleware = require("../middlewares/token.middleware");
const router = Router();
router.use(tokenMiddleware);

router.get("/home/cabinet/createPost", createPostPage);
router.post("/home/cabinet/createPost", createPost);

module.exports = router;