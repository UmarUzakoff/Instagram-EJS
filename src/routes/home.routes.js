const { Router } = require("express");
const { home, seeOtherPeoplePosts, allPosts, logout } = require("../controllers/home.controller");
const tokenMiddleware = require("../middlewares/token.middleware");
const router = Router();
router.use(tokenMiddleware);

router.get("/home", home);
router.post("/home/postsOfUser", seeOtherPeoplePosts);
router.get("/home/allPosts", allPosts);
router.get("/home/logout", logout);

module.exports = router;