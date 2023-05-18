const { Router } = require("express");
const { home, seeOtherPeoplePosts, allPosts, logout } = require("../controllers/home.controller");
const tokenMiddleware = require("../middlewares/token.middleware");
const router = Router();
router.use(tokenMiddleware);

router.get("/", home);
router.post("/postsOfUser", seeOtherPeoplePosts);
router.get("/allPosts", allPosts);
router.get("/logout", logout);

module.exports = router;