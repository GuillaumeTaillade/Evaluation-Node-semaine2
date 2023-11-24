import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";

dotenv.config();
const app = express();

app.use("/", userRoute);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
