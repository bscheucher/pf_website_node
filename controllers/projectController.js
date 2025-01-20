import db from "../config/dbConfig.js";

export const getProjects = async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM portfolio_projects ORDER BY id DESC;"
    );
    res.render("projects.ejs", { projects: rows });
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).send("An error occurred while fetching projects.");
  }
};

export const getProjectsForAdmin = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM portfolio_projects");
    res.render("admin.ejs", { projects: rows });
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).send("An error occurred while fetching projects.");
  }
};

export const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query(
      "SELECT * FROM portfolio_projects WHERE id = $1",
      [id]
    );
    if (rows.length > 0) {
      res.render("editProject.ejs", { project: rows[0] });
    } else {
      res.status(404).send("Project not found.");
    }
  } catch (err) {
    console.error("Error fetching project:", err);
    res.status(500).send("An error occurred while fetching the project.");
  }
};

export const renderNewProjectForm = (req, res) => {
  res.render("newProject.ejs", { title: "Create New Project" });
};

export const createProject = async (req, res) => {
  const {
    title,
    description,
    technologies_used,
    repository_link,
    live_demo_link,
    image_url,
  } = req.body;
  try {
    await db.query(
      `INSERT INTO portfolio_projects (title, description, technologies_used, repository_link, live_demo_link, image_url) VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        title,
        description,
        technologies_used,
        repository_link,
        live_demo_link,
        image_url,
      ]
    );
    res.redirect("/projects");
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).send("An error occurred while creating the project.");
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    technologies_used,
    repository_link,
    live_demo_link,
    image_url,
  } = req.body;

  try {
    const result = await db.query(
      `UPDATE portfolio_projects
       SET title = $1,
           description = $2,
           technologies_used = $3,
           repository_link = $4,
           live_demo_link = $5,
           image_url = $6
       WHERE id = $7`,
      [
        title,
        description,
        technologies_used,
        repository_link,
        live_demo_link,
        image_url,
        id,
      ]
    );

    if (result.rowCount > 0) {
      res.redirect("/projects");
    } else {
      res.status(404).send("Project not found.");
    }
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).send("An error occurred while updating the project.");
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      "DELETE FROM portfolio_projects WHERE id=$1",
      [id]
    );
    res.redirect("/projects/admin");
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).send("Internal Server Error");
  }
};
