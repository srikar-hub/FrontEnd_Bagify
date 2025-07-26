// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:4000/login", formData, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setErrorMsg("");
        navigate("/shop");
      } else {
        setErrorMsg("Email or password is incorrect");
      }
    } catch  {
      setErrorMsg("Email or password is incorrect");
    }
  };
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <i className="fas fa-shield-alt text-blue-600 text-5xl mb-4"></i>
          <h1 className="text-2xl font-bold text-gray-800">SecureConnect</h1>
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Log in to your account
          </h2>
          <p className="text-gray-500 text-sm">
            Don't have an account?
            <a
              href="/signup"
              className="text-blue-600 hover:text-blue-800 ml-1 cursor-pointer"
            >
              Sign up
            </a>
          </p>
        </div>

        {/* Login Form */}
        <form
          className="bg-white rounded-lg shadow-md p-8"
          method="post"
          onSubmit={handleSubmit}
        >
          {errorMsg && (
            <div className="mb-4 text-red-600 text-center font-semibold">
              {errorMsg}
            </div>
          )}
          {/* Email Field */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              onChange={handleChange}
              name="email"
              value={formData.email}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Enter your email"
            />
          </div>
          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              >
                {/* Icon is still here statically */}
                <i className="fas fa-eye text-gray-500"></i>
              </button>
            </div>
          </div>
          {/* // forgot password */}
          {/* <div className="flex justify-end mb-6">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer bg-transparent border-none p-0"
            >
              Forgot password?
            </button>
          </div> */}
          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 !rounded-button whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
          >
            <i className="fas fa-sign-in-alt"></i>
            Log In
          </button>
          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          {/* Social Login Buttons removed as requested */}
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <div className="mb-2">
            <a href="#" className="hover:text-gray-700 cursor-pointer">
              Terms of Service
            </a>
            <span className="mx-2">•</span>
            <a href="#" className="hover:text-gray-700 cursor-pointer">
              Privacy Policy
            </a>
          </div>
          <div className="mb-2">
            <a href="#" className="hover:text-gray-700 cursor-pointer">
              Need help?
            </a>
          </div>
          <div>
            © {new Date().getFullYear()} SecureConnect. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
