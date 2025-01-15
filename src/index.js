import dotenv from "dotenv";
import express from "express";
import studentRouter from "./routes/studentroutes.js";
import errorHandler from "./middleware/errorhandler.js";

dotenv.config();

const PORT = process.env.PORT || 4242;
const app = express();

//middleware
app.use(express.json());

app.use("/api/students", studentRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
