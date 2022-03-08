const fileRoutes = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const { validateSession } = require("../middleware/auth");
let dir = "./uploads";
//Image file to prevent the file type
let imageFilter = function (req, file, callback) {
  if (!file.originalname.match(/\.(jpg|JPG|png|PNG)$/)) {
    req.fileValidationError = "only image allowed";
    return callback(new Error("Image Error"), false);
  }
  callback(null, true);
};
let fileStorage = multer.diskStorage(
  {
    destination: function (req, file, cb) {
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + file.originalname);
    },
  },
  { imageFilter: imageFilter }
);
const uploader = multer({ storage: fileStorage });
fileRoutes.post(
  "/",
  validateSession,
  uploader.single("image"),
  async (req, res) => {
    try {
      const uploadedFile = req.file;
      if (uploadedFile === null || uploadedFile === undefined) {
        return res
          .json({
            error: true,
            msg: "Image upload failed, image not found",
          })
          .status(400);
      }
      const imageUrl = __dirname + "/../uploads/" + uploadedFile.filename;
      let bitmap = fs.readFileSync(imageUrl);
      let x = new Buffer(bitmap).toString("base64");
      console.log(imageUrl);
      fs.unlinkSync(imageUrl);
      // let imageSrc = "data:image/gif;base64 " + x
      return res.json({ error: false, image: x });
    } catch (e) {
      return res.jsonp({ error: true, msg: e?.message });
    }
  }
);
module.exports = fileRoutes;
