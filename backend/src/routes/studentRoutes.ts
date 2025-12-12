import express from "express";
import { Student } from "../entities/Student";
import { AppDataSource } from "../config/data-source";

const router = express.Router();

// @route   GET /api/students
// @desc    Get all students
// @access  Private/Admin
router.get("/", async (req, res) => {
    const studentRepo = AppDataSource.getRepository(Student);
    try {
        // Select logic in TypeORM is a bit different, but returning entities excludes nothing by default.
        // We can manually remove password from response or use select query builder.
        // For simplicity, retrieving all for now, assuming password column @Column({ select: false }) wasn't used but we can filter map it.
        // But Mongoose .select("-password") was used. 
        // In TypeORM: 
        const students = await studentRepo.find({
            select: {
                id: true,
                name: true,
                email: true,
                registrationNumber: true,
                createdAt: true
                // password: false // Explicitly correct way is omitting it from select object if using select: {...}
            }
        });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export default router;
