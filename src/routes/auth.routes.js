const { Router } = require("express");
const { login, register } = require("../controllers/auth.controller");
const router = Router();
const Io = require("../utils/Io");
const Users = new Io("src/database/users.json");

router.get("/auth/login", async(req, res) => {
  const users = await Users.read();
  res.render("login", {
    users,
  });
});

router.get("/auth/register", (req, res) => {
  res.render("register");
});

router.post("/auth/login", login);
router.post("/auth/register", register);

module.exports = router;