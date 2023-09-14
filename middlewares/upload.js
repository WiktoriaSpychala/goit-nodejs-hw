const multer = require("multer");
const path = require("path");
const Jimp = require("jimp");
const tempDir = path.join(__dirname, "..", "..", "public", "tmp");
const fs = require("fs/promises");
const User = require("../models/user");
const avatarsDir = path.join(__dirname, "..", "..", "public", "avatars");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});
const upload = multer({
  storage: storage,
});

const updateAvatars = async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    await Jimp.read(tempUpload)
        .then((originalname) => {
            return originalname.resize(250, 250).writeAsync(tempUpload);
        })
        .cach((err) => {
            console.error(err);
        });
    
    const imageName = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, imageName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", imageName);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
        avatarURL,
    });
};


module.exports = {
    upload,
    updateAvatars,
}