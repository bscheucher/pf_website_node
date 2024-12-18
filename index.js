import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import nodemailer from "nodemailer";
import session from "express-session";
import pg from "pg";

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

const { Pool } = pg;

// Set up the database connection
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Render's managed PostgreSQL
  },
});

db.connect()
  .then(() => console.log("Connected to the database successfully!"))
  .catch((err) => console.error("Database connection error:", err));

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

app.get("/projects", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM portfolio_projects");
    console.log(rows);
    res.render("projects.ejs", { projects: rows });
  } catch (err) {
    console.error("Error occurred when fetching projects from db:", err);
    res.status(500).send("An error occurred while fetching projects.");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
