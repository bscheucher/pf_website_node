import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import db from "../config/dbConfig.js";

passport.use(
  new Strategy(async (username, password, cb) => {
    try {
      const result = await db.query(
        "SELECT * FROM pf_users WHERE user_name = $1",
        [username]
      );

      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;

        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) return cb(err);
          if (valid) return cb(null, user);
          return cb(null, false, { message: "Incorrect password." });
        });
      } else {
        return cb(null, false, { message: "User not found." });
      }
    } catch (err) {
      console.error(err);
      return cb(err);
    }
  })
);

passport.serializeUser((user, cb) => cb(null, user.id));
passport.deserializeUser(async (id, cb) => {
  try {
    const result = await db.query("SELECT * FROM pf_users WHERE id = $1", [id]);
    cb(null, result.rows[0]);
  } catch (err) {
    cb(err);
  }
});

export default passport;
