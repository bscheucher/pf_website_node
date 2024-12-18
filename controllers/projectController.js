import db from "../config/dbConfig.js";

export const getProjects = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM portfolio_projects");
    res.render("projects.ejs", { projects: rows });
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).send("An error occurred while fetching projects.");
  }
};
