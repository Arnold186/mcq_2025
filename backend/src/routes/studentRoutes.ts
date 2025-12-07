import express from "express";
import Student from "../models/Student";
// import { protect, admin } from "../middleware/authMiddleware"; // TODO: Add middleware

const router = express.Router();

// @route   GET /api/students
// @desc    Get all students
// @access  Private/Admin
router.get("/", async (req, res) => {
    try {
        const students = await Student.find({}).select("-password");
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export default router;
