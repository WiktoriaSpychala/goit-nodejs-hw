const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user")
const gravatart = require("gravatar");
const { nanoid } = require("nanoid");
const sendEmail = require("../services/sendEmail")

const verify = async (req, res, next) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({
        verificationToken,
    });
    if (user === null) {
        return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndUpdate(user._id, {
        verify: true,
        verificationToken: null,
    });
    res.status(200).send({ message: "Verification successful" });
}


const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(409).json({ message: "Email in use" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatart.url(email);
    const verificationToken = nanoid();
    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click verify email</a>`,
    };
    await sendEmail(verifyEmail);

    res.status(201).json({
        user: {
            email: newUser.email,
            password: newUser.password,
        },
    })
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Email or password is wrong" });
    }
    if (!user.verify) {
        return res.status(401).json({ message: "Please verify your email" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        return res.status(401).json({ message: "Email or password is wrong" });
    }
    const payload = {
        id: user._id,
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "12h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
        user: {
            email: email,
            password: password,
        },
    });
};

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).send({
        message: "No Content",
    });
};

const updateSubscriptionStatus = async (req, res) => {
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
    if (!result) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(result);
};





module.exports = {
    verify,
    getCurrent,
    register,
    login,
    logout,
    updateSubscriptionStatus,
}
