const { Router } = require("express");
const { cabinet, deletePost, editPost, postForEditing } = require("../controllers/cabinet.controller");
const tokenMiddleware = require("../middlewares/token.middleware");
const router = Router();
router.use(tokenMiddleware);

router.get("/cabinet", cabinet);
router.post("/cabinet/deletePost", deletePost);
router.post("/cabinet/postForEditing", postForEditing);
router.post("/cabinet/postForEditing/editPost", editPost);

module.exports = router;