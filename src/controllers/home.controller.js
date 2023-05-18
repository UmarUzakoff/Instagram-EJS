const { v4: uuid } = require("uuid");
const Io = require("../utils/Io");
const Users = new Io("src/database/users.json");
const Posts = new Io("src/database/posts.json");

exports.home = async (req, res) => {
  const users = await Users.read();
  const verifiedUser = users.find((user) => {
    if (user.id == req.verifiedUser) {
      return user;
    }
  });
  const nameOfVerifiedUser = verifiedUser.username;
  res.render("home", {
    users,
    nameOfVerifiedUser,
  });
};

exports.seeOtherPeoplePosts = async (req, res) => {
  const posts = await Posts.read();
  const users = await Users.read();
  const { id } = req.body;
  const clickedUser = users.find((user) => {
    if (user.id == id) {
      return user;
    }
  });
  const postsOfClickedUser = posts.filter((post) => {
    return post.user_id == id;
  });
  const usernameOfClickedUser = clickedUser.username;
  res.render("clickedUser", {
    usernameOfClickedUser,
    postsOfClickedUser,
  });
};

exports.allPosts = async (req, res) => {
  const posts = await Posts.read();
  const users = await Users.read();
  const shuffledPosts = posts.sort(() => 0.5 - Math.random());
  const randomPosts = shuffledPosts.splice(0, 10);
  const data = randomPosts.map(post => {
    const user = users.find(user => user.id === post.user_id);
    return {
      image: post.image,
      name: post.name,
      description: post.description,
      hashtag: post.hashtag,
      username: user.username
    };
  });
  res.render('allPosts', { data });
};

exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.redirect('/api/auth/login');
}