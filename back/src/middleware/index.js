const postMiddleware = require("./postMiddleware");
const categoryMiddleware = require("./categoryMiddleware");
const authMiddleware = require("./authMiddleware");
const userMiddleware = require("./userMiddleware");
const commentMiddleware = require("./commentMiddleware");
const commonMiddleware = require("./commonMiddleware");
const imageMiddleware = require("./imageMiddleware");

module.exports = {
  postMiddleware,
  categoryMiddleware,
  userMiddleware,
  authMiddleware,
  commentMiddleware,
  commonMiddleware,
  imageMiddleware,
};
