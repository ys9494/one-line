const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const { Comment } = require("../data-access/models");

const checkCompleteCommentFrom = (from) => (req, res, next) => {
  const { content } = req[from];
  if (content === undefined) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: content는 필수값입니다.`
      )
    );
  }
  next();
};

module.exports = {
  checkCompleteCommentFrom,
};
