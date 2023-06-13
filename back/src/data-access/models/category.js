const Sequelize = require("sequelize");

module.exports = class Category extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING,
          references: {
            model: "users",
            key: "id",
          },
        },
        name: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "Category",
        tableName: "categories",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Category.hasMany(db.Post, { onUpdate: "CASCADE", onDelete: "SET NULL" });
    db.Category.belongsTo(db.User);
  }
};
