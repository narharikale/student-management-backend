import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

export const createStudentTable = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS students (
        id UUID PRIMARY KEY,
        name VARCHAR(100),
        age INTEGER,
        class VARCHAR(5),
        phoneNumber VARCHAR(15),
        createdAt TIMESTAMP,
        updatedAt TIMESTAMP
      )
    `);
  } finally {
    client.release();
  }
};

export const getAllStudents = async () => {
  const client = await pool.connect();

  try {
    const result = await client.query("SELECT * FROM students");
    console.log(result.rows);
    return result.rows;
  } finally {
    client.release();
  }
};

export const insertStudent = async (student) => {
  const client = await pool.connect();
  const id = uuidv4();
  const createdAt = new Date();
  const updatedAt = new Date();
  try {
    const result = await client.query(
      `
      INSERT INTO students (id, name, age, class, phoneNumber, createdAt, updatedAt)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `,
      [
        id,
        student.name,
        student.age,
        student.class,
        student.phoneNumber,
        createdAt,
        updatedAt,
      ]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const updateStudentById = async (id, student) => {
  const updatedAt = new Date();
  const query = {
    text: `
        UPDATE students 
        SET name = $1, 
            age = $2, 
            class = $3,
            phoneNumber = $4,
            updatedAt = $5
        WHERE id = $6
        RETURNING *
      `,
    values: [
      student.name,
      student.age,
      student.class,
      student.phoneNumber,
      updatedAt,
      id,
    ],
  };

  try {
    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Failed to update student: ${error.message}`);
  }
};

export const deleteStudentById = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "DELETE FROM students WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};
