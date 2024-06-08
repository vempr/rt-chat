import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../mongoose/schemas/user.ts";
import { UserMongoType } from "../../shared/schemas/userSchema.ts";
import { comparePassword } from "../utils/hash.ts";

declare global {
  namespace Express {
    interface User {
      username: string;
      password: string;
      _id: string;
    }
  }
}

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user._id);
  });
});

passport.deserializeUser(function (id, cb) {
  process.nextTick(async function () {
    try {
      const u: UserMongoType | null = await User.findById(id);
      if (!u) throw new Error("User not found");
      cb(null, u);
    } catch (err) {
      cb(err, undefined);
    }
  });
});

passport.use(
  new Strategy(async function (username, password, cb) {
    try {
      const u: UserMongoType | null = await User.findOne({ username });
      if (!u) throw new Error("Username not found");
      if (!(await comparePassword(password, u.password))) {
        throw new Error("Invalid Credentials");
      }
      cb(null, u);
    } catch (err) {
      if (err instanceof Error) cb(err.message, undefined);
    }
  })
);

export default passport;
