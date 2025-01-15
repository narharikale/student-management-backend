import { createStudentTable, insertStudent } from "../models/studentmodel.js";
import { mockStudents } from "../config/seed.js";

export const seedDatabase = async (req, res, next) => {
  try {
    await createStudentTable();
    const insertPromises = mockStudents.map((student) =>
      insertStudent(student)
    );
    await Promise.all(insertPromises);
    res.json({ success: true, message: "Database seeded successfully" });
  } catch (error) {
    console.log(error);
  }
};
