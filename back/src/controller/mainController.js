const { mainService } = require("../service");
const { Post } = require("../data-access/models");
const util = require("../misc/util");

const mainController = {
  async getPosts(req, res, next) {
    try {
      const { pageNo } = req.query;
      const posts = await mainService.getPosts(pageNo);
      res.status(200).json(util.buildResponse(posts));
    } catch (error) {
      next(error);
    }
  },

  async getPostsByTrending(req, res, next) {
    try {
      const { pageNo } = req.query;
      const posts = await mainService.getPostsByTrending(pageNo);
      res.json(util.buildResponse(posts));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = mainController;
