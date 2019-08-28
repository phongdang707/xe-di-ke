const express = require("express");
const router = express.Router();
const userController = require("./controller");
const { authenticate, authorize } = require("../../../middlewares/auth");
const { uploadImage } = require("../../../middlewares/uploadimage");

router.get("/", userController.getUser);
router.get("/:id", userController.getUserById);

router.post("/", userController.createUser);
router.put(
  "/:id",
  authenticate,
  authorize(["driver", "Driver"]),
  userController.updateUserById
);
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  userController.deleteUserById
);
router.post("/login", userController.login);
router.post(
  "/upload-avatar/:id",
  uploadImage("avatar"),
  userController.uploadAvatar
);
module.exports = router;
