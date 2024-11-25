import { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const validateForm = () => {
    if (!otp) {
      setError("OTP is required.");
      toast.error("OTP is required.");
      return false;
    }
    if (!newPassword) {
      setError("New password is required.");
      toast.error("New password is required.");
      return false;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      toast.error("Password must be at least 6 characters.");
      return false;
    }
    if (!confirmPassword) {
      setError("Confirm password is required.");
      toast.error("Confirm password is required.");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error messages

    // Validate the form inputs
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      toast.success("Password reset successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to reset password. Try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <ToastContainer />
      <div className="w-full max-w-md p-6 bg-white/30 backdrop-blur-sm rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Reset Password
        </h2>
        <p className="text-sm text-gray-600 text-center">
          Enter the OTP sent to your email and reset your password.
        </p>
        <form className="mt-6" onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700"
            >
              OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className={`w-full px-4 py-2 mt-1 bg-white/30 backdrop-blur-sm text-gray-700 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                error ? "border-red-500" : ""
              }`}
            />
            {error && otp === "" && (
              <p className="text-sm text-red-500 mt-1">{error}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className={`w-full px-4 py-2 mt-1 bg-white/30 backdrop-blur-sm text-gray-700 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                error && newPassword === "" ? "border-red-500" : ""
              }`}
            />
            {error && newPassword === "" && (
              <p className="text-sm text-red-500 mt-1">{error}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className={`w-full px-4 py-2 mt-1 bg-white/30 backdrop-blur-sm text-gray-700 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                error && confirmPassword === "" ? "border-red-500" : ""
              }`}
            />
            {error && confirmPassword === "" && (
              <p className="text-sm text-red-500 mt-1">{error}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg shadow-blue-500/50 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-xl"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
