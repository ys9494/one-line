const checkNicknameFrom = (source, checkNickname) => {
  return (req, res, next) => {
    const nickname = req[source][checkNickname];
    console.log(nickname);

    if (nickname !== req.nickname) {
      // req 객체에서 저장된 닉네임와 일치하는지 확인합니다.
      return res.status(403).json({ message: "일치하는 회원이 없습니다." });
    }

    next();
  };
};
module.exports = {
  // 다른 미들웨어 export 코드는 생략됨
  checkNicknameFrom,
};
