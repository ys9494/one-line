const { postDAO } = require("../data-access");
const { Op } = require("sequelize");

const searchService = {
  async getSearchResult(keyword) {
    const searchFilter = {
      [Op.or]: [
        { title: { [Op.like]: `%${keyword}%` } },
        { content: { [Op.like]: `%${keyword}%` } },
        { summary: { [Op.like]: `%${keyword}%` } },
      ],
    };
    const searchResult = await postDAO.findAllBy(searchFilter);
    console.log("search", searchResult);
    return searchResult;
  },
};

module.exports = searchService;
