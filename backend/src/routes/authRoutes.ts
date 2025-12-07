import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/Student";
import Admin from "../models/Admin";

const router = express.Router();

// Helper to generate JWT
const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "secret", {
        expiresIn: "30d",
    });
};

// @route   POST /api/auth/student/signup
// @desc    Register a new student
// @access  Public
router.post("/student/signup", async (req, res) => {
    const { name, email, registrationNumber, password } = req.body;

    try {
        const studentExists = await Student.findOne({ email });
        if (studentExists) {
            res.status(400).json({ message: "Student already exists" });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const student = await Student.create({
            name,
            email,
            registrationNumber,
            password: hashedPassword,
        });

        if (student) {
            res.status(201).json({
                _id: student.id,
                name: student.name,
                email: student.email,
                registrationNumber: student.registrationNumber,
                token: generateToken(student.id),
            });
        } else {
            res.status(400).json({ message: "Invalid student data" });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

// @route   POST /api/auth/student/login
// @desc    Auth student & get token
// @access  Public
router.post("/student/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const student = await Student.findOne({ email });

        if (student && (await bcrypt.compare(password, student.password))) {
            res.json({
                _id: student.id,
                name: student.name,
                email: student.email,
                registrationNumber: student.registrationNumber,
                token: generateToken(student.id),
                role: "student"
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

// @route   POST /api/auth/admin/login
// @desc    Auth admin & get token
// @access  Public
router.post("/admin/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });

        if (admin && (await bcrypt.compare(password, admin.password))) {
            res.json({
                _id: admin.id,
                fullName: admin.fullName,
                username: admin.username,
                token: generateToken(admin.id),
                role: "admin"
            });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export default router;
