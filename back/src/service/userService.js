const { userDAO } = require("../data-access");
const util = require("../misc/util");

const userService = {
  async createUser({ id, blogName, email, nickname, bio, admin }) {
    const existedId = await userDAO.findOne({ id });
    if (existedId) {
      throw new Error("이미 가입된 계정입니다.");
    }

    const existedEmail = await userDAO.findOne({ email });
    if (existedEmail) {
      throw new Error("이미 가입된 이메일입니다.");
    }

    const existedNickname = await userDAO.findOne({ nickname });
    if (existedNickname) {
      throw new Error("중복되는 닉네임입니다.");
    }

    const createdUser = await userDAO.create({
      id,
      blogName,
      email,
      nickname,
      bio,
      admin,
    });
    return createdUser;
  },

  async getUser(id) {
    const user = await userDAO.findOne({ id });
    return user;
  },

  async getAllUsers(page, perPage) {
    const { users, total, totalPage } = await userDAO.findAll(page, perPage);
    return { users, total, totalPage };
  },

  async getMyPage(id) {
    const user = await userDAO.findMyDetail({ id });
    return user;
  },

  async getUserByNickname(nickname) {
    console.log("nick", nickname);
    const nicknameUser = await userDAO.findOneDetail({ nickname });
    console.log("userrrrrrrrrrrr", nicknameUser.Posts);
    return nicknameUser;
  },

  async updateUser(id, userDto) {
    // nickname 수정하는 경우 닉네임 중복 검사
    // const { nickname } = userDto;
    // if (nickname !== undefined) {
    //   const existedNickname = await userDAO.findOne({ nickname });
    //   if (existedNickname) {
    //     throw new Error("중복되는 닉네임입니다.");
    //   }
    // }

    console.log("dto", userDto);

    const updatedUser = await userDAO.updateOne(userDto, { id });

    return updatedUser;
  },

  async deleteUser(id) {
    const deletedUser = await userDAO.deleteOne(id);
    if (!deletedUser) {
      throw new Error("탈퇴할 사용자가 존재하지 않습니다.");
    }
    return deletedUser;
  },

  async getFollowers(id) {
    const followers = await userDAO.findFollowers(id);
    return followers;
  },

  async getFollowings(id) {
    const followings = await userDAO.findFollowings(id);
    return followings;
  },

  async addFollowing(userId, followingId) {
    const result = await userDAO.addFollowing(userId, followingId);
    return result;
  },

  async deleteFollowing(userId, followingId) {
    const result = await userDAO.deleteFollowing(userId, followingId);
    return result;
  },
};

module.exports = userService;
