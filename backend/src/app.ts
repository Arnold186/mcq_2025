import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
// import assignmentRoutes from "./routes/assignmentRoutes";
import studentRoutes from "./routes/studentRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/auth", authRoutes);
// app.use("/api/assignments", assignmentRoutes);
app.use("/api/students", studentRoutes);

export default app;
