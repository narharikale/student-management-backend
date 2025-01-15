import express from "express";

const router = express.Router();

router.get("/", getStudents);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.post("/seed", seedDatabase);

export default router;
