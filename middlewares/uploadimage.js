const multer = require("multer");
const uploadImage = type => {
  //type = "avatars" / "cart"
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, `./upload/${type}s`);
    },
    filename: function(req, file, cb) {
      console.log(file.originalname);
      cb(null, Date.now() + "-" + file.originalname);
    }
  });
  const upload = multer({ storage: storage });
  return upload.single("avatar");
};
module.exports = {
  uploadImage
};
