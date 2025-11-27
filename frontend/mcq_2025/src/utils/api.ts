import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" }
});

// learner APIs
export const fetchAssignmentStatus = () => api.get("/assignment/status");
export const fetchQuestions = () => api.get("/questions");
export const submitAttempt = (payload: any) => api.post("/attempts/submit", payload);

// admin (example)
export const adminLogin = (creds: any) => api.post("/admin/login", creds);
export const fetchAllAttempts = () => api.get("/results");
export const createQuestion = (q: any) => api.post("/questions", q);
