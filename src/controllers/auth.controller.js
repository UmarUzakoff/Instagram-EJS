const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");

const Io = require("../utils/Io");
const Users = new Io("src/database/users.json");
const User = require("../models/User");

exports.login = async (req, res) => {
  try {
    const users = await Users.read();
    const { username, password } = req.body;
    //Finding a username and Comparing Hash Values
    const findUser = users.find((user) => user.username === username);
    if (!findUser) {
      return res.redirect("/auth/login");
    }
    const comparePasswords = await bcrypt.compare(password, findUser.password);
    if (!comparePasswords) {
      return res.redirect("/auth/login");
    }
    //TOKEN
    const token = jwt.sign({ id: findUser.id });
    res.cookie("token", token, { maxAge: 3000000000, secure: true });
    res.status(200).redirect("/");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const users = await Users.read();
    const { username, password } = req.body;

    //FINDUSER
    const findUser = users.find((user) => user.username === username);
    if (findUser) {
      return res.redirect("/auth/register");
    }

    //HASHING PASSWORD
    const hashedPassword = await bcrypt.hash(password, 12);

    //ID - UUID
    const id = uuid();

    //WRITE NEWUSER
    const newUser = new User(id, username, hashedPassword);
    const data = users.length ? [...users, newUser] : [newUser];
    Users.write(data);

    //TOKEN
    const token = jwt.sign({ id: newUser.id });
    res.cookie("token", token, { maxAge: 3000000000 , secure: true });
    res.status(201).redirect("/");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};