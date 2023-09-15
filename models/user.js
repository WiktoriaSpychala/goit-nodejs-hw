const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 7,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
      required: [true, "Verify token is required"],
    },
  },
  {
    versionKey: false,
  }
);
const User = model("user", userSchema);
module.exports = User;