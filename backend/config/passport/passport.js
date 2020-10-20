const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const db = require("../../models");

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "NTPQ",
};
const JWTStrategy = new Strategy(option, async (payload, done) => {
  const targetUser = await db.User.findOne({ where: { eMail: payload.email } });
  if (targetUser) {
    done(null, targetUser);
  } else {
    done(null, false);
  }
});

passport.use("jwt", JWTStrategy);
