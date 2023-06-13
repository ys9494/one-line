const express = require("express");
const { commentController } = require("../controller");
const {
  postMiddleware,
  commentMiddleware,
  commonMiddleware,
  authMiddleware,
} = require("../middleware");

const commentRouter = express.Router();

// 댓글
commentRouter.post(
  "/:postId",
  authMiddleware.verifyIdToken,
  commonMiddleware.checkIdFrom("params", "postId"),
  commonMiddleware.checkNonExistenceFrom("params", "postId", "게시글"),
  commentController.postComment
);

commentRouter.patch(
  "/:commentId",
  authMiddleware.verifyIdToken,
  commonMiddleware.checkIdFrom("params", "commentId"),
  commentMiddleware.checkCompleteCommentFrom("body"),
  commonMiddleware.checkNonExistenceFrom("params", "commentId", "댓글"),
  commonMiddleware.checkUserAuthorization,
  commentController.patchComment
);

commentRouter.delete(
  "/:commentId",
  authMiddleware.verifyIdToken,
  commonMiddleware.checkIdFrom("params", "commentId"),
  commonMiddleware.checkNonExistenceFrom("params", "commentId", "댓글"),
  commonMiddleware.checkUserAuthorization,
  commentController.deleteComment
);

module.exports = commentRouter;
