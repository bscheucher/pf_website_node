import express from "express";
import { sendContactEmail } from "../controllers/contactController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("contact.ejs");
});

router.post("/", sendContactEmail);

export default router;
