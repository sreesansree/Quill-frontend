import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast styling
import { useUser } from "../context/UserContext.jsx";
import api from "../api/api.js";

const Signin = () => {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { loginUser } = useUser();

  const validateForm = () => {
    // Validate email or mobile (email format check)
    const validataionError = {};

    const emailPattern = /\S+@\S+\.\S+/;
    const isEmail = emailPattern.test(credential);
    if (!credential) {
      validataionError.credential = "Email or Mobile is required!";
      toast.error("Email or Mobile is required!");
      return false;
    }
    if (!isEmail && !/^\d{10}$/.test(credential)) {
      // Assuming mobile is 10 digits long
      toast.error("Please enter a valid email or mobile number!");
      return false;
    }

    // Validate password (minimum 6 characters)
    if (!password) {
      toast.error("Password is required!");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setCredential(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!validateForm()) {
      return;
    }
    try {
      const response = await api.post("/api/auth/login", {
        credential,
        password,
      });
      loginUser(response.data);
      navigate("/");
      toast.success(response.message || "Signin successful!");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      toast.error(
        error.response?.data?.message ||
          "Network error. Please try again later."
      );
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <ToastContainer />
      <div className="w-full max-w-md p-6 bg-white/30 backdrop-blur-sm rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Welcome Back to Quill
        </h2>
        <p className="text-sm text-gray-600 text-center">
          Sign in to your account
        </p>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="credential"
              className="block text-sm font-medium text-gray-700"
            >
              Email or Mobile
            </label>
            <input
              type="text"
              id="credential"
              value={credential}
              // onChange={(e) => setCredential(e.target.value)}
              onChange={handleChange}
              placeholder="Enter your email or mobile"
              className="w-full bg-white/30 backdrop-blur-sm px-4 py-2 mt-1 text-gray-700 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 bg-white/30 backdrop-blur-sm text-gray-700 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {error && (
            <p className="text-sm text-red-500 text-center pb-3">{error}</p>
          )}
          <button
            type="submit"
            className="transition ease-in-out delay-150 duration-300  hover:-translate-y-1 hover:scale-100 w-full px-4 py-2 text-white bg-blue-600 rounded-lg shadow-blue-500/50  hover:bg-blue-700 hover:shadow-blue-500 /50 focus:ring-4 focus:ring-blue-300 shadow-xl"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 flex flex-col gap-1 text-sm text-center text-gray-600">
          <Link
            to={"/forget-password"}
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
