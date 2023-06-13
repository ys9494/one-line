const { searchService } = require("../service");
const { Post } = require("../data-access/models");
const util = require("../misc/util");

const searchController = {
  async getSearchResult(req, res, next) {
    try {
      const { keyword } = req.query;

      const searchResult = await searchService.getSearchResult(keyword);
      if (!searchResult) {
        return res.status(404).send("검색 결과가 존재하지 않습니다.");
      }
      res.status(200).json(util.buildResponse(searchResult));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = searchController;
