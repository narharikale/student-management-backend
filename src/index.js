import dotenv from "dotenv";
import express from "express";
import studentRouter from "./routes/studentroutes.js";

dotenv.config();
const PORT = process.env.PORT || 4242;
const app = express();

app.use("/api/students", studentRouter);

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
