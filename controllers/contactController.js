import { createTransporter } from "../config/emailConfig.js";

export const sendContactEmail = async (req, res) => {
  const { email, subject, message } = req.body;

  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: email,
      to: "bernhard.scheucher@gmail.com",
      subject: `Message from ${email}: ${subject}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res.render("success.ejs", { email, subject });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Something went wrong. Please try again later.");
  }
};
