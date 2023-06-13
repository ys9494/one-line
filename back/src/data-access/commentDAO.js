const { Comment } = require("./models");

const commentDAO = {
  // 댓글 작성
  async create(commentDTO) {
    const createdComment = await Comment.create(commentDTO);
    return createdComment;
  },

  // 댓글 조회
  async findOne(filter) {
    const comment = await Comment.findOne({
      where: filter,
    });
    return comment;
  },

  // 댓글 수정
  async updateOne(commentDTO, filter) {
    const updatedComment = await Comment.update(commentDTO, {
      where: filter,
    });

    return updatedComment;
  },

  // 댓글 삭제
  async deleteOne(filter) {
    const deletedComment = await Comment.destroy({
      where: filter,
    });

    return deletedComment;
  },
};

module.exports = commentDAO;
