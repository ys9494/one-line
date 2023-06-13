const { postDAO } = require("../data-access");

const postService = {
  async createPost(postDTO) {
    const createdPost = await postDAO.create(postDTO);
    return createdPost;
  },

  async getPostsByCategory(categoryId) {
    const posts = await postDAO.findAllBy({
      CategoryId: categoryId,
    });
    return posts;
  },

  async getPost(postId) {
    const post = await postDAO.findOne({ id: postId });
    return post;
  },

  async getAllPosts(page, perPage) {
    const { posts, total, totalPage } = await postDAO.findAllPosts(
      page,
      perPage
    );
    return { posts, total, totalPage };
  },

  async updatePost(postId, postDto) {
    const updatedPost = await postDAO.updateOne(postDto, { id: postId });
    return updatedPost;
  },

  async deletePost(postId) {
    const deletedPost = await postDAO.deleteOne({ id: postId });
    return deletedPost;
  },

  async updateLike(postId, userId) {
    const post = await postDAO.findOne({ id: postId });
    if (!post) {
      return res.status(404).send("포스트를 찾지 못했습니다.");
    }
    const updatedLike = await post.addLiker(userId);
    return updatedLike;
  },

  async deleteLike(postId, userId) {
    const post = await postDAO.findOne({ id: postId });
    if (!post) {
      return res.status(404).send("포스트를 찾지 못했습니다.");
    }
    const deletedLike = await post.removeLiker(userId);
    return deletedLike;
  },
};

module.exports = postService;
