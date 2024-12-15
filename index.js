import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import nodemailer from "nodemailer";
import session from "express-session";

const app = express();
const port = process.env.PORT || 3000;

env.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.post("/contact", async (req, res) => {
  const { email, subject, message } = req.body;

  try {
    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PW,
      },
    });

    // Define the email options
    const mailOptions = {
      from: email,
      to: "bernhard.scheucher@gmail.com",
      subject: `Message from ${email}: ${subject}`,
      text: message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    res.render("success.ejs", { email, subject });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Something went wrong. Please try again later.");
  }
});

app.get("/projects", (req, res) => {
  res.render("projects.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
