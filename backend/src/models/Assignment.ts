import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswers: [{ type: String, required: true }], // Array of correct options
    points: { type: Number, default: 1 },
    // "single" for radio buttons, "multiple" for checkboxes
    allowMultipleAnswers: { type: Boolean, default: false },
});

const assignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    questions: [questionSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
    isPublished: { type: Boolean, default: false },
    settings: {
        durationMinutes: { type: Number }, // 0 or undefined means no limit
        startTime: { type: Date },
        endTime: { type: Date },
    },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Assignment", assignmentSchema);
