const { categoryService } = require("../service");
const { Category } = require("../data-access/models");
const util = require("../misc/util");

const categoryController = {
  async postCategory(req, res, next) {
    const userId = req.uid;
    try {
      const { name } = req.body;
      const categoryDTO = {
        UserId: userId,
        name,
      };
      const newCategory = await categoryService.createCategory(categoryDTO);
      res.status(201).json(util.buildResponse(newCategory));
    } catch (error) {
      next(error);
    }
  },

  async getCategories(req, res, next) {
    const userId = req.uid;
    try {
      const categories = await categoryService.getCategories(userId);
      res.status(200).json(util.buildResponse(categories));
    } catch (error) {
      next(error);
    }
  },

  async patchCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const { name } = req.body;

      const categoryDTO = {
        name,
      };

      const updatedCategory = await categoryService.updateCategory(
        categoryId,
        categoryDTO
      );
      res.json(util.buildResponse(updatedCategory));
    } catch (error) {
      next(error);
    }
  },

  async deleteCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const category = await categoryService.deleteCategory(categoryId);
      res.status(200).json(util.buildResponse(category));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = categoryController;
