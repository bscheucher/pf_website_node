import express from "express";
import ensureAuthenticated from "../middleware/ensureAuthenticated.js";
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
router.get("/admin", ensureAuthenticated, getProjectsForAdmin);
router.get("/new", ensureAuthenticated, renderNewProjectForm);
router.get("/:id", ensureAuthenticated, getProjectById);
router.post("/", ensureAuthenticated, createProject);
router.post("/:id", ensureAuthenticated, updateProject);
router.post("/delete/:id", ensureAuthenticated, deleteProject);

export default router;
