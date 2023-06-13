const express = require("express");
const { categoryController } = require("../controller");
const {
  categoryMiddleware,
  commonMiddleware,
  authMiddleware,
} = require("../middleware");

const categoryRouter = express.Router();

categoryRouter.get(
  "/",
  authMiddleware.verifyIdToken,
  categoryController.getCategories
);

categoryRouter.post(
  "/",
  authMiddleware.verifyIdToken,
  categoryMiddleware.checkCompleteCategoryFrom("body"),
  categoryMiddleware.checkExistCategoryNameFrom("body"),
  categoryController.postCategory
);

categoryRouter.get(
  "/",
  authMiddleware.verifyIdToken,
  categoryController.getCategories
);

categoryRouter.patch(
  "/:categoryId",
  authMiddleware.verifyIdToken,
  commonMiddleware.checkIdFrom("params", "categoryId"),
  categoryMiddleware.checkCompleteCategoryFrom("body"),
  commonMiddleware.checkNonExistenceFrom("params", "categoryId", "카테고리"),
  commonMiddleware.checkUserAuthorization,
  categoryController.patchCategory
);

categoryRouter.delete(
  "/:categoryId",
  authMiddleware.verifyIdToken,
  commonMiddleware.checkIdFrom("params", "categoryId"),
  commonMiddleware.checkNonExistenceFrom("params", "categoryId", "카테고리"),
  commonMiddleware.checkUserAuthorization,
  categoryController.deleteCategory
);

module.exports = categoryRouter;
