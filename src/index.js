import dotenv from "dotenv";
import express from "express";

dotenv.config();
const PORT = process.env.PORT || 4242;
const app = express();

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
