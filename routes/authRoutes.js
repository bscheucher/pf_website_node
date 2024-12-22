import express from "express";
import bcrypt from "bcrypt";
import passport from "../middleware/passportConfig.js";
import db from "../config/dbConfig.js";
import ensureAuthenticated from "../middleware/ensureAuthenticated.js";

const router = express.Router();
const saltRounds = 10;

router.get("/register", ensureAuthenticated, (req, res) => res.render("register.ejs"));

router.post("/register", ensureAuthenticated, async (req, res) => {
  const { username, password } = req.body;

  try {
    const checkResult = await db.query(
      "SELECT * FROM pf_users WHERE user_name = $1",
      [username]
    );

    if (checkResult.rows.length > 0) return res.redirect("/");

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await db.query(
      "INSERT INTO pf_users (user_name, password) VALUES ($1, $2)",
      [username, hashedPassword]
    );

    req.login({ username }, (err) => {
      if (err) {
        console.error("Login error:", err);
        return res.redirect("/");
      }
      res.redirect("/projects/admin");
    });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
});

router.get("/login", (req, res) => res.render("login.ejs"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/projects/admin",
    failureRedirect: "/",
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

export default router;
