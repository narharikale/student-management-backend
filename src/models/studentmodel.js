import pool from "../config/db.js";

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

export const insertStudent = async (student) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `
        INSERT INTO students (id, name, age, class, phoneNumber, createdAt, updatedAt)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `,
      [
        student.id,
        student.name,
        student.age,
        student.class,
        student.phoneNumber,
        student.createdAt,
        student.updatedAt,
      ]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};
