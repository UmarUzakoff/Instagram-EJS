const auth = require("./auth.routes");
const home = require("./home.routes");
const cabinet = require("./cabinet.routes");
const createPost = require("./createPost.routes");

module.exports = [auth, home, createPost, cabinet];