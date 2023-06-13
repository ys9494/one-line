const Sequelize = require("sequelize");

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING,
          references: {
            model: "users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        title: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        summary: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        views: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "Post",
        tableName: "posts",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.User, {
      through: "Like",
      as: "Likers",
    });
    db.Post.belongsTo(db.Category);
    db.Post.hasMany(db.Comment);
  }
};
