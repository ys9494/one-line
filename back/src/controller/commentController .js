const { commentService } = require("../service");
const { Comment } = require("../data-access/models");
const util = require("../misc/util");

const commentController = {
  async postComment(req, res, next) {
    const userId = req.uid;
    try {
      const { postId } = req.params;
      const { content } = req.body;
      const commentDTO = {
        UserId: userId,
        PostId: postId,
        content,
      };
      const newComment = await commentService.createComment(commentDTO);
      res.status(201).json(util.buildResponse(newComment));
    } catch (error) {
      next(error);
    }
  },

  async patchComment(req, res, next) {
    try {
      const { commentId } = req.params;
      const { content } = req.body;

      const commentDTO = {
        content,
      };
      const updatedCategory = await commentService.updateComment(
        commentId,
        commentDTO
      );

      res.status(200).json(util.buildResponse(updatedCategory));
    } catch (error) {
      next(error);
    }
  },

  async deleteComment(req, res, next) {
    try {
      const { commentId } = req.params;
      const deletedComment = await commentService.deleteComment(commentId);
      res.status(200).json(util.buildResponse(deletedComment));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = commentController;
