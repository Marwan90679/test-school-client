import React, { use, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router";

const SignIn = () => {
  return (
    <div className="">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-slate-900 text-center text-3xl font-semibold">
              Sign in
            </h2>
            <form className="mt-12 space-y-6">
              <div>
                <label className="text-slate-800 text-sm font-medium mb-2 block">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    required
                    className="w-full text-slate-800 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600 pr-10"
                    placeholder="Enter email"
                  />
                  <span className="absolute right-3 cursor-pointer text-gray-500 hover:text-gray-700"></span>
                </div>
              </div>
              <div>
                <label className="text-slate-800 text-sm font-medium mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    required
                    className="w-full text-slate-800 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600 pr-10"
                    placeholder="Enter password"
                  />
                  <span className="absolute right-3 cursor-pointer text-gray-500 hover:text-gray-700"></span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div className="!mt-12 flex justify-center">
                <input
                  type="submit"
                  className="cursor-pointer hover:bg-blue-700 bg-blue-600 rounded-xl px-10 py-4 text-white font-bold text-lg"
                  value="Sign In"
                />
              </div>
              <p className="text-slate-800 text-sm !mt-6 text-center">
                Don't have an account?{" "}
                <Link
                  to="/signUp"
                  className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Register here
                </Link>
              </p>
            </form>
            <button
                type="button"
                className="gap-2 font-semibold text-lg cursor-pointer border-none text-white flex bg-blue-600 rounded-lg justify-center my-3 border w-full mx-auto items-center p-4 drop-shadow-2xl"
              >
                <span>Google</span> Sign in with Google
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
