import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast styling
import { useUser } from "../context/UserContext.jsx";
import api from "../api/api.js";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { registeredUser } = useUser();

  const handleResendOtp = async () => {
    console.log("Resending OTP...");
    // try {
    //   const res = await fetch("/api/auth/resend-otp", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email: registeredUser }), // Pass the email from state
    //   });
    //   const data = await res.json();
    //   if (res.ok) {
    //     toast.success(data.message || "OTP resent successfully!");
    //     setTimer(30); // Reset timer
    //   } else {
    //     toast.error(data.message || "Failed to resend OTP.");
    //   }
    // } catch (error) {
    //   console.log(error.message);
    //   toast.error("Network error. Please try again later.");
    // }
    try {
      const response = await api.post("/api/auth/resend-otp", {
        email: registeredUser, // Pass the email from state
      });

      // Axios automatically parses the response as JSON
      if (response.status === 200) {
        toast.success(response.data.message || "OTP resent successfully!");
        setTimer(30); // Reset timer
      } else {
        toast.error(response.data.message || "Failed to resend OTP.");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Network error. Please try again later.");
    }
  };

  // Timer countdown logic
  useState(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Validate the OTP
  const validate = () => {
    const validationErrors = {};
    if (!otp) {
      validationErrors.otp = "OTP is required.";
    } else if (!/^\d{6}$/.test(otp)) {
      validationErrors.otp = "OTP must be a 6-digit number.";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please correct the errors before proceeding.");
      return;
    }
    try {
      // const res = await fetch("/api/auth/verify-otp", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email: registeredUser, otp }),
      // });
      // const data = await res.json();
      // if (res.ok) {
      //   toast.success(data.message || "Account verified successfully!");
      //   setTimeout(() => navigate("/login"), 2000); // Navigate after success
      // } else {
      //   toast.error(data.message || "Invalid OTP. Please try again.");
      // }
      const response = await api.post(
        "/api/auth/verify-otp",
        {
          email: registeredUser,
          otp: otp,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Handle success response
      if (response.status === 200) {
        toast.success(
          response.data.message || "Account verified successfully!"
        );
        setTimeout(() => navigate("/login"), 2000);  
      } else {
        toast.error(response.data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <ToastContainer />
      <div className="w-full max-w-md p-6 bg-white/30 backdrop-blur-sm rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Verify Your Email
        </h2>
        <p className="text-sm text-gray-600 text-center">
          We have sent an OTP to{" "}
          <span className="font-medium">{registeredUser}</span>
        </p>

        <form className="mt-6" onSubmit={handleVerifyOtp}>
          <div className="mb-4">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700"
            >
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
              placeholder="Enter the 6-digit OTP"
              className="w-full px-4 py-2 mt-1 bg-white/30 backdrop-blur-sm text-gray-700 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
            {errors.otp && (
              <p className="mt-1 text-sm text-red-500 text-center">
                {errors.otp}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Verify
          </button>
        </form>

        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={handleResendOtp}
            disabled={timer > 0}
            className={`${
              timer > 0
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            } px-4 py-2 rounded-lg shadow-md`}
          >
            {timer > 0 ? `Resend OTP (${timer}s)` : "Resend OTP"}
          </button>
          <p className="text-sm text-gray-600">
            {timer > 0 && `Wait for ${timer}s to resend`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
