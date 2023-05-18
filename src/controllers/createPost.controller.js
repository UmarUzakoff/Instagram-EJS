const { v4: uuid } = require("uuid");
const Io = require("../utils/Io");
const Users = new Io("src/database/users.json");
const Posts = new Io("src/database/posts.json");
const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const posts = await Posts.read();
    const { name, description, hashtag } = req.body;
    const id = uuid();
    const user_id = req.verifiedUser;
    var { image } = req.files;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    let imageName = `${uuid()}.${image.mimetype.split("/")[1]}`;
    if (image.mimetype === "image/svg+xml") {
      //SVG fayllarning oxiri MIME type da svg+xml bilan tugar ekan, uni UIga chiqarish uchun image .svg bilan tugashi kerak, shuning uchun shunday qildim
      imageName = `${uuid()}.svg`;
    }
    image.mv(`${process.cwd()}/uploads/${imageName}`);

    //WRITE newPOST
    const newPost = new Post(id, imageName, name, description, hashtag, user_id);
    const data = posts.length ? [...posts, newPost] : [newPost];
    Posts.write(data);
    res.status(201).redirect("/cabinet");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPostPage = async (req, res) => {
  const users = await Users.read();
  const verifiedUser = users.find((user) => {
    if (user.id == req.verifiedUser) {
      return user;
    }
  });
  const nameOfVerifiedUser = verifiedUser.username;
  res.render("createPost", {
    nameOfVerifiedUser,
  });
};