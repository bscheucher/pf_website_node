import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import session from "express-session";
import homeRoutes from "./routes/homeRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

env.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.use("/", homeRoutes);
app.use("/contact", contactRoutes);
app.use("/projects", projectRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
