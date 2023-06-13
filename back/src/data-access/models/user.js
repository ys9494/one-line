const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true,
        },
        nickname: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        blogName: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        bio: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        admin: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        image: {
          type: Sequelize.STRING(500),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        hooks: {
          beforeCreate: (user, options) => {
            if (!user.blogName) {
              user.blogName = `${user.nickname}의 블로그`;
            }
            if (!user.bio) {
              user.bio = `${user.nickname}의 공간입니다`;
            }
          },
          beforeUpdate: (user, options) => {
            if (!user.blogName) {
              user.blogName = `${user.nickname}의 블로그`;
            }
            if (!user.bio) {
              user.bio = `${user.nickname}의 공간입니다`;
            }
          },
        },
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Category);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, {
      through: "Like",
      as: "Liked",
      foreignKey: "UserId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "followingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "followerId",
    });
  }
};
