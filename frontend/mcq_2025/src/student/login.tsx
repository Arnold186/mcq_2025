import React from "react";
import { Link } from "react-router-dom";

const StudentLogin: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
      <div className="mx-auto grid w-full max-w-5xl min-h-[540px] overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(15,47,33,0.12)] md:grid-cols-2">
        <div className="flex flex-col justify-center gap-10 px-6 py-10 md:px-14 md:py-16">
          <div>
            <p className="text-lg font-medium capitalize text-slate-900">Welcome back!</p>
            <h1 className="mt-2 text-2xl font-semibold leading-snug text-slate-900 md:text-[2rem]">
              Enter your credentials to access your account
            </h1>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-500">
              Name
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                name="name"
                type="text"
                placeholder="Enter your Name"
                autoComplete="name"
                required
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-slate-500">
              <div className="flex items-center justify-between font-medium">
                <span>Password</span>
                <a className="text-xs font-semibold text-blue-600 hover:text-blue-500" href="#">
                  forgot password
                </a>
              </div>

              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                required
              />
            </label>

            <button
              className="mt-2 w-full rounded-xl bg-emerald-500 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-600 hover:shadow-emerald-300"
              type="submit"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link className="font-semibold text-blue-700 hover:text-blue-500" to="/student/signup">
              Sign Up
            </Link>
          </p>
        </div>

        <div
          aria-hidden="true"
          className="relative hidden min-h-[540px] md:block">
          <div className="absolute inset-15 bg-[url('/studentlogin.png')] bg-contain bg-bottom bg-no-repeat" />
        </div>
      </div>
  );
};

export default StudentLogin;
