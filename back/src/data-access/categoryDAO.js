const { Post, Category } = require("./models");

const categoryDAO = {
  // 카테고리 작성
  async create(categoryDTO) {
    const createdCategory = await Category.create(categoryDTO);
    return createdCategory;
  },

  // 카테고리 조회
  async findAllBy(filter) {
    const categories = await Category.findAll({
      where: filter,
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: Post,
          attributes: ["id"],
        },
      ],
    });

    return categories;
  },

  // 카테고리 수정
  async updateOne(categoryDto, filter) {
    const updatedCategory = await Category.update(categoryDto, {
      where: filter,
    });

    return updatedCategory;
  },

  // 카테고리 삭제
  async deleteOne(filter) {
    const deletedCategory = await Category.destroy({
      where: filter,
    });

    return deletedCategory;
  },
};

module.exports = categoryDAO;
