import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./route/user.route";

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("<h1>Server is running!</h1>");
});

app.use("/api", userRoutes);

app.listen(PORT, () => console.log("Server is running..."));
