const express = require("express");
const { userController, imageController } = require("../controller");
const {
  commonMiddleware,
  userMiddleware,
  authMiddleware,
  imageMiddleware,
} = require("../middleware");
// const upload = require("../middleware/imageMiddleware");

const userRouter = express.Router();

// 유저 개인페이지 홈 및 내 정보 조회
userRouter.get(
  "/",
  authMiddleware.verifyIdToken,
  userController.getMyPage // 로그인된 유저의 모든 정보를 res.json
);

// 타 유저 페이지 방문시 정보 조회(닉네임으로)
userRouter.get(
  "/page",
  userController.getUserByNickname // 해당 닉네임의 user의 모든 정보를 res.json
);

// 개인페이지 > 내 정보(정보 수정 中 정보 수정)
userRouter.patch(
  "/",
  authMiddleware.verifyIdToken,
  imageMiddleware.uploadImage,
  userController.updateUser
);

// 개인페이지 > 내 정보(정보 수정 中 정보 삭제(탈퇴))
userRouter.delete("/", authMiddleware.verifyIdToken, userController.deleteUser);

// 팔로우
userRouter.post(
  "/followings/:followingId",
  authMiddleware.verifyIdToken,
  userController.addFollowing
);
// 언팔
userRouter.delete(
  "/followings/:followingId",
  authMiddleware.verifyIdToken,
  userController.deleteFollowing
);
// user가 팔로우 하는 users 목록 반환
userRouter.get(
  "/followings",
  authMiddleware.verifyIdToken,
  userController.getFollowings
);
// user를 팔로우 하는 users 목록 반환
userRouter.get(
  "/followers",
  authMiddleware.verifyIdToken,
  userController.getFollowers
);

module.exports = userRouter;
