const { userService } = require("../service");
const util = require("../misc/util");
const { getAuth, initPromise } = require("../config").firebase;
const upload = require("../config/s3");

const userController = {
  // 회원가입
  async createUser(req, res, next) {
    try {
      const { email, password, nickname, blogName, bio, admin } = req.body;
      console.log(req.body);
      await initPromise;
      const firebaseAuth = getAuth();

      // Firebase 사용자 생성
      const firebaseUser = await firebaseAuth.createUser({
        email,
        password,
        displayName: nickname,
      });

      const id = firebaseUser.uid; // uid를 가져옵니다.

      // 데이터베이스에 사용자 정보 저장
      const user = await userService.createUser({
        id,
        email,
        password,
        nickname,
        blogName,
        bio,
        admin,
      });

      res.status(201).json(util.buildResponse(user));
    } catch (error) {
      next(error);
    }
  },

  // 사용자 정보 수정
  async updateUser(req, res, next) {
    try {
      const id = req.uid; // 수정된 부분
      const { blogName, bio } = req.body;
      const image = req.image;

      console.log("image", req.image);

      // const firebaseAuth = getAuth();

      // Firebase 사용자 이메일, 비밀번호, 닉네임 변경
      // const user = await firebaseAuth.getUser(id);
      // if (user) {
      //   if (email) {
      //     await firebaseAuth.updateUser(user.uid, { email });
      //   }
      //   if (password) {
      //     await firebaseAuth.updateUser(user.uid, { password });
      //   }
      //   if (nickname) {
      //     await firebaseAuth.updateUser(user.uid, { displayName: nickname });
      //   }
      // }

      const userDto = {
        blogName,
        bio,
      };

      if (image) {
        userDto.image = image;
      } else {
        userDto.image = null;
      }

      const updatedUser = await userService.updateUser(id, userDto);
      res.status(200).json(util.buildResponse(updatedUser));
    } catch (error) {
      next(error);
    }
  },

  // user를 팔로우 하는 users
  async getFollowers(req, res, next) {
    try {
      const followers = await userService.getFollowers(req.uid);
      res.json(followers);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  // user가 팔로우 하는 users
  async getFollowings(req, res, next) {
    try {
      const followings = await userService.getFollowings(req.uid);
      res.json(followings);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  // 팔로우 추가
  async addFollowing(req, res, next) {
    try {
      const { followingId } = req.params;
      const result = await userService.addFollowing(req.uid, followingId);
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  // 팔로우 취소
  async deleteFollowing(req, res, next) {
    try {
      const { followingId } = req.params;
      const result = await userService.deleteFollowing(req.uid, followingId);
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  // 사용자 정보 조회
  async getUser(req, res, next) {
    try {
      const id = req.uid; // 수정된 부분
      const user = await userService.getUser(id);
      res.status(200).json(util.buildResponse(user));
    } catch (error) {
      next(error);
    }
  },

  // 사용자 정보 조회(유저 본인)
  async getMyPage(req, res, next) {
    try {
      const id = req.uid;
      const result = await userService.getMyPage(id);
      if (!result) {
        return res.status(404).send("존재하지 않는 회원입니다.");
      }
      res.json(util.buildResponse(result));
    } catch (error) {
      next(error);
    }
  },

  // 닉네임으로 사용자 정보 조회(타유저)
  async getUserByNickname(req, res, next) {
    try {
      const { nickname } = req.query;
      // console.log("nickname : ", nickname);
      const result = await userService.getUserByNickname(nickname);
      console.log("result : ", result);
      if (!result) {
        return res.status(404).send("존재하지 않는 닉네임입니다.");
      }
      res.json(util.buildResponse(result));
    } catch (error) {
      next(error);
    }
  },

  // 사용자 정보 삭제 (회원 탈퇴)
  async deleteUser(req, res, next) {
    try {
      const id = req.uid; // 수정된 부분
      const auth = getAuth();

      // Firebase 사용자 삭제
      await auth.deleteUser(id);

      const user = await userService.deleteUser(id);

      res.status(204).json(`${user.nickname}님의 탈퇴가 완료되었습니다.`);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
