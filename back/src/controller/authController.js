const { getAuth, initPromise } = require("../config").firebase;

const authController = {
  // Firebase 로그인
  loginUser: async (req, res, next) => {
    const uid = req.uid;
    const idToken = req.idToken;
    const firebaseAuth = getAuth();

    try {
      await initPromise;
      const userRecord = await firebaseAuth.getUser(uid); // Firebase에서 이메일로 사용자 정보를 가져옵니다.

      if (!userRecord) {
        return res.status(401).json({ message: "회원을 찾을 수 없습니다." });
      }

      const user = {
        email: userRecord.email,
        uid: userRecord.uid,
      };

      return res.status(200).json({ data: { user, idToken } });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
