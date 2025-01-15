import express from "express";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  seedDatabase,
} from "../controllers/studentcontroller.js";

const router = express.Router();

router.get("/", getStudents);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.post("/seed", seedDatabase);

export default router;
