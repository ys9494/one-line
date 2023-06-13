const { commentDAO } = require("../data-access");

const commentService = {
  async createComment(commentDTO) {
    const createdComment = await commentDAO.create(commentDTO);
    return createdComment;
  },

  async updateComment(commentId, commentDTO) {
    const updatedComment = await commentDAO.updateOne(commentDTO, {
      id: commentId,
    });
    return updatedComment;
  },

  async deleteComment(commentId) {
    const deletedComment = await commentDAO.deleteOne({ id: commentId });
    return deletedComment;
  },
};

module.exports = commentService;
