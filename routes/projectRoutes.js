import express from "express";
import {
  getProjects,
  getProjectsForAdmin,
  getProjectById,
  renderNewProjectForm,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

console.log("Registering project routes");
const router = express.Router();

router.get("/", getProjects);
router.get("/admin", getProjectsForAdmin);
router.get("/new", renderNewProjectForm);
router.get("/:id", getProjectById);
router.post("/", createProject);
router.post("/:id", updateProject);
router.post("/delete/:id", deleteProject);

export default router;
