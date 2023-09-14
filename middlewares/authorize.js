const passport = require("passport")
const passportJWT = require("passport-jwt")
const User = require("../models/user");

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};
passport.use(
  new Strategy(params, function (payload, done) {
    User.find({ _id: payload.id })
      .then(([user]) => {
        if (!user) {
          return done(new Error('User not found'));
        }
        return done(null, user);
      })
      .catch(err => done(err));
  }),
);

const auth = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
        const token = req.headers["authorization"].split(" ")[1];
        if (!user || err || !token || token !== user.token) {
            return res.status(401).json({ message: "Not authorized" });
        }
        req.user = user;
        next();
    })
};
module.exports = auth;