const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const { Post, Category, Comment } = require("../data-access/models");

const checkIdFrom = (from, checkId) => (req, res, next) => {
  const id = req[from][checkId];
  if (id === undefined) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: ${checkId}는 필수값입니다.`
      )
    );
  }
  next();
};

const checkNonExistenceFrom =
  (from, checkId, table) => async (req, res, next) => {
    const id = req[from][checkId];
    const userId = req.uid;

    const tableEnum = {
      ["게시글"]: Post,
      ["카테고리"]: Category,
      ["댓글"]: Comment,
    };

    if (id === undefined || id === null) {
      next();
    }

    const existPost = await tableEnum[table].findOne({
      where: {
        id,
      },
    });

    if (existPost === null) {
      next(
        new AppError(
          commonErrors.resourceNotFoundError,
          400,
          `존재하지 않는 ${table}입니다.`
        )
      );
    }

    if (existPost) req.existPost = existPost;
    next();
  };

const checkUserAuthorization = async (req, res, next) => {
  const uid = req.uid;
  const { userId } = req.existPost;

  if (uid !== userId) {
    next(
      new AppError(commonErrors.authorizationError, 403, `사용 권한이 없음`)
    );
  }

  next();
};

module.exports = {
  checkIdFrom,
  checkNonExistenceFrom,
  checkUserAuthorization,
};
