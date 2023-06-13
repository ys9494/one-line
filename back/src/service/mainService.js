const { postDAO } = require("../data-access");

const mainService = {
  async getPosts(pageNo) {
    const posts = await postDAO.findAll(pageNo);
    return posts;
  },

  async getPostsByTrending(pageNo) {
    const posts = await postDAO.findAllByTrending(pageNo);
    return posts;
  },
};

module.exports = mainService;
