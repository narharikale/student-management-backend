import dotenv from "dotenv";
import express from "express";
import studentRouter from "./routes/studentroutes.js";
import errorHandler from "./middleware/errorhandler.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 4242;
const app = express();

//middleware
app.use(express.json());
app.use(express.static("public"));

// Serve index.html on root route
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

app.use("/api/students", studentRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
