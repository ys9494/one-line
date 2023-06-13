const express = require("express");
const { authMiddleware } = require("../middleware");
const { authController, userController } = require("../controller");

const authRouter = express.Router();

// 회원가입
authRouter.post("/join", userController.createUser);

// 로그인 (Firebase 사용)
authRouter.post(
  "/login",
  authMiddleware.verifyIdToken,
  authController.loginUser
);

module.exports = authRouter;
