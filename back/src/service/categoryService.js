const { categoryDAO, postDAO } = require("../data-access");

const categoryService = {
  async createCategory(categoryDTO) {
    const createdCategory = await categoryDAO.create(categoryDTO);
    return createdCategory;
  },

  async getCategories(userId) {
    const categories = await categoryDAO.findAllBy({ UserId: userId });
    return categories;
  },

  async updateCategory(categoryId, categoryDTO) {
    const updatedCategory = await categoryDAO.updateOne(categoryDTO, {
      id: categoryId,
    });
    return updatedCategory;
  },

  async deleteCategory(categoryId) {
    const deletedCategory = await categoryDAO.deleteOne({ id: categoryId });

    const postDTO = { CategoryId: null };
    const updatePostCategory = await postDAO.updateOne(postDTO, {
      CategoryId: categoryId,
    });

    return { deletedCategory, updatePostCategory };
  },
};

module.exports = categoryService;
