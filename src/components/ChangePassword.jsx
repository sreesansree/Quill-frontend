import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors((prev) => ({ ...prev, [name]: "" }));

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required.";
      isValid = false;
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required.";
      isValid = false;
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters long.";
      isValid = false;
    } else if (!/[A-Z]/.test(formData.newPassword)) {
      newErrors.newPassword =
        "Password must include at least one uppercase letter.";
      isValid = false;
    } else if (!/[a-z]/.test(formData.newPassword)) {
      newErrors.newPassword =
        "Password must include at least one lowercase letter.";
      isValid = false;
    } else if (!/[0-9]/.test(formData.newPassword)) {
      newErrors.newPassword = "Password must include at least one number.";
      isValid = false;
    } else if (!/[!@#$%^&*]/.test(formData.newPassword)) {
      newErrors.newPassword =
        "Password must include at least one special character (!@#$%^&*).";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
      isValid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const token = JSON.parse(localStorage.getItem("loggedUser"))?.token;

    try {
      const response = await axios.put(
        "/api/user/change-password",
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        toast.success("Password updated successfully.");
        onClose();
      } else {
        toast.error(response.data.message || "Failed to update password.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating password.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-md shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Change Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className={`w-full border ${
                errors.currentPassword ? "border-red-500" : "border-gray-300"
              } rounded-md p-2`}
              required
            />
            {errors.currentPassword && (
              <small className="text-red-500">{errors.currentPassword}</small>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`w-full border ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              } rounded-md p-2`}
              required
            />
            {errors.newPassword && (
              <small className="text-red-500">{errors.newPassword}</small>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-md p-2`}
              required
            />
            {errors.confirmPassword && (
              <small className="text-red-500">{errors.confirmPassword}</small>
            )}
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
