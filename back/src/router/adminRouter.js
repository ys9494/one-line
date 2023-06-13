const express = require("express");
const { authMiddleware } = require("../middleware");
const { adminController, postController } = require("../controller");

const adminRouter = express.Router();

// 회원정보
adminRouter.get("/", authMiddleware.verifyAdmin, adminController.getUserList);
// 회원정보수정(관리자 권한)
adminRouter.patch(
  "/:userId",
  authMiddleware.verifyAdmin,
  adminController.updateUser
);
// 회원탈퇴
adminRouter.delete(
  "/:userId",
  authMiddleware.verifyAdmin,
  adminController.deleteUser
);
// 모든 게시글 조회
adminRouter.get(
  "/posts",
  authMiddleware.verifyAdmin,
  adminController.getPostList
);

// 게시글 삭제
adminRouter.delete(
  "/posts/:postId",
  authMiddleware.verifyAdmin,
  postController.deletePost
);

module.exports = adminRouter;
