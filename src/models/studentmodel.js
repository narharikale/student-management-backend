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

export const updateStudentById = async (id, updates) => {
  const client = await pool.connect();
  const fields = Object.keys(updates);
  const setClauses = fields.map((field, index) => `"${field}" = $${index + 1}`);
  const query = `
    UPDATE students
    SET ${setClauses.join(", ")}, "updatedat" = $${fields.length + 1}
    WHERE id = $${fields.length + 2}
    RETURNING *;
  `;
  const values = [...fields.map((field) => updates[field]), new Date(), id];
  try {
    const result = await client.query(query, values);
    return result.rows[0];
  } finally {
    client.release();
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
