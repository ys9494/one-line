const express = require("express");
const { postController, mainController } = require("../controller");
const {
  postMiddleware,
  imageMiddleware,
  commonMiddleware,
  authMiddleware,
} = require("../middleware");

const postRouter = express.Router();

// 전체 게시글 조회(최신순)
postRouter.get("/recent", mainController.getPosts);

// 전체 게시글 조회(조회수 순)
postRouter.get("/trending", mainController.getPostsByTrending);

// 게시글 작성
postRouter.post(
  "/",
  authMiddleware.verifyIdToken,
  postMiddleware.checkCompletePostFrom("body"),
  commonMiddleware.checkNonExistenceFrom("body", "categoryId", "카테고리"),
  postController.postPost
);

// 이미지 업로드
postRouter.post(
  "/image",
  authMiddleware.verifyIdToken,
  imageMiddleware.upload.single("image"),
  postController.uploadPostImage
);

// 카테고리별 게시글 조회
postRouter.get(
  "/category/:categoryId",
  commonMiddleware.checkIdFrom("params", "categoryId"),
  commonMiddleware.checkNonExistenceFrom("params", "categoryId", "카테고리"),
  postController.getPostsByCategory
);

// 게시글 상세 조회
postRouter.get(
  "/:postId",
  commonMiddleware.checkIdFrom("params", "postId"),
  commonMiddleware.checkNonExistenceFrom("params", "postId", "게시글"),
  postController.getPost
);

// 게시글 수정
postRouter.patch(
  "/:postId",
  authMiddleware.verifyIdToken,
  commonMiddleware.checkIdFrom("params", "postId"),
  postMiddleware.checkMinPostConditionFrom("body"),
  commonMiddleware.checkNonExistenceFrom("body", "categoryId", "카테고리"),
  commonMiddleware.checkNonExistenceFrom("params", "postId", "게시글"),
  commonMiddleware.checkUserAuthorization,
  postController.patchPost
);

// 게시글 삭제
postRouter.delete(
  "/:postId",
  authMiddleware.verifyIdToken,
  commonMiddleware.checkIdFrom("params", "postId"),
  commonMiddleware.checkNonExistenceFrom("params", "postId", "게시글"),
  commonMiddleware.checkUserAuthorization,
  postController.deletePost
);

// 좋아요
postRouter.patch(
  "/:postId/like",
  authMiddleware.verifyIdToken,
  commonMiddleware.checkIdFrom("params", "postId"),
  commonMiddleware.checkNonExistenceFrom("params", "postId", "게시글"),
  postController.patchLike
);

// 좋아요 취소
postRouter.delete(
  "/:postId/like",
  authMiddleware.verifyIdToken,
  commonMiddleware.checkIdFrom("params", "postId"),
  commonMiddleware.checkNonExistenceFrom("params", "postId", "게시글"),
  postController.deleteLike
);

module.exports = postRouter;
