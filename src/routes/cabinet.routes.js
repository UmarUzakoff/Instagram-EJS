const { Router } = require("express");
const { cabinet, deletePost, editPost, postForEditing } = require("../controllers/cabinet.controller");
const tokenMiddleware = require("../middlewares/token.middleware");
const router = Router();
router.use(tokenMiddleware);

router.get("/home/cabinet", cabinet);
router.post("/home/cabinet/deletePost", deletePost);
router.post("/home/cabinet/postForEditing", postForEditing);
router.post("/home/cabinet/postForEditing/editPost", editPost);

module.exports = router;