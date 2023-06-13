const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const { getAuth } = require("../config").firebase;
const { userService } = require("../service");

// Firebase ID 토큰 검증 미들웨어
const verifyIdToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const firebaseAuth = getAuth();

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError(commonErrors.authError, 401, "토큰이 없습니다."));
  }
  console.log(authHeader);

  const idToken = authHeader.split("Bearer ")[1];
  try {
    const decodedToken = await firebaseAuth.verifyIdToken(idToken);
    req.uid = decodedToken.uid;
    req.idToken = idToken;
    next();
  } catch (error) {
    return next(
      new AppError(commonErrors.authError, 401, "토큰이 유효하지 않습니다.")
    );
  }
};
const verifyAdmin = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const firebaseAuth = getAuth();

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError(commonErrors.authError, 401, "토큰이 없습니다."));
  }

  const idToken = authHeader.split("Bearer ")[1];

  let decodedToken;
  try {
    decodedToken = await firebaseAuth.verifyIdToken(idToken);
  } catch (error) {
    return next(
      new AppError(commonErrors.authError, 401, "토큰이 유효하지 않습니다.")
    );
  }

  const id = decodedToken.uid;
  let user;
  try {
    user = await userService.getUser(id);
    console.log(user.admin); // getUser 함수가 비동기라면 await가 필요할 수 있습니다.
  } catch (error) {
    return next(
      new AppError(commonErrors.authError, 401, "사용자를 찾을 수 없습니다.")
    );
  }

  if (user.admin !== true) {
    next(
      new AppError(
        commonErrors.authorizationError,
        403,
        "권한이 없는 사용자입니다."
      )
    );
  }

  next();
};

module.exports = {
  verifyIdToken,
  verifyAdmin,
};
