const Io = require("../utils/Io");
const Users = new Io("src/database/users.json");
const Posts = new Io("src/database/posts.json");
const Post = require("../models/Post");

exports.cabinet = async (req, res) => {
  const posts = await Posts.read();
  const personalPosts = posts.filter(
    (post) => post.user_id == req.verifiedUser
  );
  const users = await Users.read();
  const verifiedUser = users.find((user) => {
    if (user.id == req.verifiedUser) {
      return user;
    }
  });
  const nameOfVerifiedUser = verifiedUser.username;
  const idOfVerifiedUser = verifiedUser.id;
  res.render("cabinet", {
    personalPosts,
    nameOfVerifiedUser,
    idOfVerifiedUser,
  });
};

exports.deletePost = async (req, res) => {
  const posts = await Posts.read();
  const { id } = req.body;
  console.log(id);
  const restOfPosts = posts.filter((post) => post.id != id);
  Posts.write(restOfPosts);
  res.status(200).redirect("/cabinet");
};

exports.postForEditing = async (req, res) => {
  const posts = await Posts.read();
  const personalPosts = posts.filter(
    (post) => post.user_id == req.verifiedUser
  );
  const { id } = req.body;
  const postForEditing = personalPosts.find((post) => post.id == id);
  res.render("editPost", {
    postForEditing,
  });
};

exports.editPost = async (req, res) => {
  const posts = await Posts.read();
  const personalPosts = posts.filter(
    (post) => post.user_id == req.verifiedUser
  );
  const { id, name, description } = req.body;
  console.log(id,name, description);
  const restOfPosts = personalPosts.filter((post) => post.id != id);
  posts.forEach((post) => {
    if (post.id == id ) {
      post.name = name;
      post.description = description;
      return [...restOfPosts, post];
    }
  });
  Posts.write(posts);
  res.status(200).redirect("/cabinet");
};