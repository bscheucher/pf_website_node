import express from "express";
import env from "dotenv";
import session from "express-session";
import methodOverride from "method-override";
import passport from "./middleware/passportConfig.js";
import authRoutes from "./routes/authRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

env.config();

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  console.log("Current user:", req.user);
  res.locals.user = req.user;
  next();
});

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log("Current user:", req.user);
  res.locals.user = req.user;
  next();
});

// Routes
app.use("/", authRoutes);
app.use("/", homeRoutes);
app.use("/contact", contactRoutes);
app.use("/projects", projectRoutes);

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
