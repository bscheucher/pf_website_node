import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import nodemailer from "nodemailer";

const app = express();
const port = 3000;

env.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/projects", (req, res) => {
  res.render("projects.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
