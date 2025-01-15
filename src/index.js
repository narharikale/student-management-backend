import dotenv from "dotenv";
import express from "express";
import studentRouter from "./routes/studentroutes.js";
import errorHandler from "./middleware/errorhandler.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 4242;
const app = express();

//middleware
app.use(cors()); // Enable All CORS Requests

app.use(express.json());

app.use("/api/students", studentRouter);
app.use("/", "Hello world");

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
