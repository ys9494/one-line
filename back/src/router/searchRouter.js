const express = require("express");
const { searchController } = require("../controller");
const { commonMiddleware } = require("../middleware");

const searchRouter = express.Router();

searchRouter.get(
  "/",
  commonMiddleware.checkIdFrom("query", "keyword"),
  searchController.getSearchResult
);

module.exports = searchRouter;
