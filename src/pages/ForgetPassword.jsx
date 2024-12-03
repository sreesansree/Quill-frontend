import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/api.js";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /\S+@\S+\.\S+/; // Simple email regex pattern
    return emailPattern.test(email);
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();

    setError("");

    // Validate email before sending the request
    if (!email) {
      setError("Email is required.");
      toast.error("Email is required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);

    try {
      await api.post("/api/auth/request-otp", { email });
      toast.success("OTP sent to your email");
      setTimeout(() => {
        navigate(`/reset-password?email=${email}`);
      }, 3000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send OTP. Try again!"
      );
    } finally {
      setLoading(false);
    }
  };
  const handlOnChange = (e) => {
    setError("");
    setEmail(e.target.value)

  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <ToastContainer />
      <div className="w-full max-w-md p-6 bg-white/30  backdrop-blur-sm rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-600 text-center">
          Enter your registered email to receive an OTP.
        </p>
        <form className="mt-6" onSubmit={handleRequestOTP}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handlOnChange}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 mt-1 bg-white/30 backdrop-blur-sm text-gray-700 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                error ? "border-red-500" : ""
              }`}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg shadow-blue-500/50 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-xl"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
