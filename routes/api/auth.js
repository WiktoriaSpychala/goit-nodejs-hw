const express = require("express");
const {
    getCurrent,
    register,
    login,
    logout,
    updateSubscriptionStatus,
} = require("../../controlers/users");
const auth = require("../../middlewares/authorize");
const { validateData } = require("../../middlewares/validate");
const { registerSchema, loginSchema } = require("../../schemas/user")
const router = express.Router();

router.get("/current", auth, getCurrent);
router.post("/register", validateData(registerSchema), register);
router.post("/login", validateData(loginSchema), login);
router.post("/logout", auth, logout);
router.patch("/subscritption", auth, updateSubscriptionStatus);

module.exports = router;