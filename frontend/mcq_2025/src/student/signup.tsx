import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const StudentSignup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    registrationNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Simulate Signup and Login
    const studentProfile = {
      name: formData.name,
      registrationNumber: formData.registrationNumber,
      email: formData.email,
    };
    localStorage.setItem("studentProfile", JSON.stringify(studentProfile));
    console.log("Student Profile saved:", studentProfile);

    // Redirect to dashboard (or login, but for smoother flow let's go to dashboard/quiz)
    navigate("/student/dashboard"); // Assuming there's a dashboard, or we can go to quiz if ready.
  };

  return (
    <div className="h-screen overflow-hidden w-full flex">
      <style>
        {`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-button {
              display: none;
              height: 0;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: #06B652;
              border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: #06B652 transparent;
            }
          `}
      </style>
      <div className="w-1/2 overflow-y-auto custom-scrollbar flex flex-col gap-10 px-6 py-10 md:px-14 md:py-16">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Get Started Now
          </h1>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-500">
            Name
            <input
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-500">
            Email address
            <input
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-500">
            Registration Number
            <input
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              name="registrationNumber"
              type="text"
              placeholder="REG-Number"
              value={formData.registrationNumber}
              onChange={handleChange}
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-500">
            Password
            <input
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-500">
            Re-enter Password
            <input
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </label>

          <button
            className="mt-2 w-full rounded-xl bg-emerald-500 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-600 hover:shadow-emerald-300"
            type="submit"
          >
            Signup
          </button>
        </form>

        <div className="flex items-center gap-2">
          <div className="flex-1 border-t border-slate-300"></div>
          <span className="text-sm text-slate-400">Or</span>
          <div className="flex-1 border-t border-slate-300"></div>
        </div>

        <p className="text-sm text-slate-600 text-center">
          <Link className="font-semibold text-blue-700 hover:text-blue-500" to="/admin/login">
            Signup as <span className="text-blue-600">Admin</span>
          </Link>
        </p>

        <p className="text-sm text-slate-600 text-center">
          Have an account?{" "}
          <Link className="font-semibold text-blue-700 hover:text-blue-500" to="/student/login">
            Sign In
          </Link>
        </p>
      </div>

      <div
        aria-hidden="true"
        className="relative hidden w-1/2 h-full md:block">
        <div className="absolute inset-0 bg-[url('/studentlogin.png')] bg-contain bg-center bg-no-repeat" />
      </div>
    </div>
  );
};

export default StudentSignup;

