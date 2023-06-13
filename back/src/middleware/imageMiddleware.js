const AWS = require("../config/s3");
const path = require("path");
const multer = require("multer");
const multerS3 = require("multer-s3");

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: process.env.S3_BUCKET_NAME,
    key(req, file, cb) {
      cb(null, `${Date.now()}_${path.basename(file.originalname)}`);
    },
  }),
  limit: { fileSize: 20 * 1024 * 1024 },
});

const uploadImage = async (req, res, next) => {
  try {
    const uploadMiddleware = upload.single("image");
    uploadMiddleware(req, res, (err) => {
      if (err) {
        throw new Error("이미지 업로드 실패");
      }

      if (req.file) {
        req.image = req.file.location;
      }

      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upload,
  uploadImage,
};
