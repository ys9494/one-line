const upload = require("../middleware/imageMiddleware");

const imageController = {
  async uploadImage(req, res, next) {
    // console.log("image request : ", req);
    try {
      if (!req.file) {
        next();
      }
      const uploadMiddleware = upload.single("image");
      uploadMiddleware(req, res, (err) => {
        if (err) throw new Error("이미지 업로드 실패");
        const imageUrl = req.file.location;
        req.image = imageUrl;
        next();
      });
    } catch (error) {
      next(error);
    }
  },

  async upload(req, res, next) {
    const uploadMiddleware = upload.single("image");
    uploadMiddleware(req, res, (err) => {
      if (err) throw new Error("이미지 업로드 실패");
      const imageUrl = req.file.location;
      req.image = imageUrl;
      next();
    });
  },
};

module.exports = imageController;

// if (req.file) {
//     // 이미지 업로드 처리
//     const uploadMiddleware = upload.single('image');
//     uploadMiddleware(req, res, (err) => {
//       if (err) {
//         // 업로드 실패 처리
//         // ...
//       } else {
//         // 업로드 성공 시 updateUser 컨트롤러 호출
//         updateUser(req, res, next);
//       }
//     });
//   } else {
//     // 이미지가 없는 경우
//     updateUser(req, res, next);
//   }
// } catch (error) {
//   next(error);
// }
