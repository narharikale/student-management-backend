import { v4 as uuidv4 } from "uuid";
import {
  createStudentTable,
  insertStudent,
  getAllStudents,
  updateStudentById,
  deleteStudentById,
} from "../models/studentmodel.js";

import { mockStudents } from "../config/seed.js";

const handleResponse = (res, status, message, data = null) => {
  return res.status(status).json({ status, message, data });
};

export const getStudents = async (req, res, next) => {
  try {
    const students = await getAllStudents();
    handleResponse(res, 200, "Students fetched successfully", students);
  } catch (err) {
    next(err);
  }
};

export const createStudent = async (req, res, next) => {
  try {
    const { name, age, class: grade, phonenumber } = req.body;
    const student = {
      id: uuidv4(),
      name,
      age,
      class: grade,
      phonenumber,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const newStudent = await insertStudent(student);
    handleResponse(res, 201, "Students Created Sucessfully", newStudent);
  } catch (err) {
    next(err);
  }
};

export const updateStudent = async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  if (Object.keys(updates).length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "No fields provided to update" });
  }

  try {
    const updatedStudent = await updateStudentById(id, updates);
    if (!updatedStudent) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }
    handleResponse(res, 201, "Students Updated Sucessfully", updatedStudent);
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedStudent = await deleteStudentById(id);
    if (!deletedStudent) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }
    handleResponse(res, 201, "Students Deleted Sucessfully", deletedStudent);
  } catch (err) {
    next(err);
  }
};

export const seedDatabase = async (req, res, next) => {
  try {
    await createStudentTable();
    const insertPromises = mockStudents.map((student) =>
      insertStudent(student)
    );
    await Promise.all(insertPromises);
    res.json({ success: true, message: "Database seeded successfully" });
  } catch (error) {
    //next(error);
  }
};
