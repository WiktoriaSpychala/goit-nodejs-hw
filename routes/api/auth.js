const express = require("express");
const {
    verify,
    getCurrent,
    register,
    login,
    logout,
    updateSubscriptionStatus,
} = require("../../controlers/users");
const resendVerifyEmail = require("../../services/resendVerifyEmail");
const auth = require("../../middlewares/authorize");
const { validateData } = require("../../middlewares/validate");
const { upload, updateAvatars } = require("../../middlewares/upload");
const { registerSchema, loginSchema, verifySchema } = require("../../schemas/user")
const router = express.Router();

router.get("/current", auth, getCurrent);
router.post("/register", validateData(registerSchema), register);
router.post("/login", validateData(loginSchema), login);
router.post("/logout", auth, logout);
router.patch("/subscritption", auth, updateSubscriptionStatus);
router.patch("/avaters", auth, upload.single("avatar"), updateAvatars);
router.get("/verify/:verificationToken", verify);
router.post("/verify", validateData(verifySchema), resendVerifyEmail);

module.exports = router;