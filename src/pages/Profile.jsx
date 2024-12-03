// import React from "react";
// import { useUser } from "../context/UserContext";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast styling
import { ChangePasswordModal } from "../components/ChangePassword";
import api from "../api/api.js";




const Profile = () => {
  //   const { loggedUser } = useUser();
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: loggedUser?.user?.name || "",
    lastName: loggedUser?.user?.lastName || "",
    dob: loggedUser?.user?.dob ? loggedUser.user.dob.split("T")[0] : "",
    phone: loggedUser?.user?.phone || "",
    email: loggedUser?.user?.email || "",
    preferences: loggedUser?.user?.preferences?.join(", ") || "",
  });

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required.";
    if (!formData.dob.trim()) newErrors.dob = "Date of birth is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits.";
    if (
      formData.preferences
        .trim()
        .split(",")
        .some((pref) => !pref.trim())
    )
      newErrors.preferences =
        "Preferences must be non-empty and separated by commas.";
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = loggedUser?.token;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await api.put(
        "/api/user/update-profile",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          dob: formData.dob,
          phone: formData.phone,
          email: formData.email,
          preferences: formData.preferences
            .split(",")
            .map((pref) => pref.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        // Update localStorage and close modal

        const updatedLoggedUser = { ...loggedUser, user: data.user };
        localStorage.setItem("loggedUser", JSON.stringify(updatedLoggedUser));
        setIsModalOpen(false);
        toast.success("Profile updated successfully!");
      } else {
        console.log(response.data.message);
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while updating profile."
      );
    }
    setIsModalOpen(false);
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        My Profile
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Info Section */}
        <ToastContainer />
        <div className="flex-1 bg-gray-40 p-4 shadow rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Personal Info
            </h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Edit
            </button>
          </div>

          <div className="space-y-2 text-gray-600">
            <div>
              <span className="font-medium text-gray-700">Profile Image:</span>
              <img
                src={loggedUser?.user?.profilePicture}
                alt="Profile"
                className="w-24 h-24 rounded-full mt-2"
              />
            </div>
            <p>
              <span className="font-medium text-gray-700">Name:</span>{" "}
              {loggedUser?.user?.firstName || "N/A"}{" "}
              {loggedUser?.user?.lastName || "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-700">DOB:</span>{" "}
              {new Date(loggedUser?.user?.dob).toLocaleDateString("en-GB") ||
                "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-700">Mobile Number:</span>{" "}
              {loggedUser?.user?.phone || "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-700">Email:</span>{" "}
              {loggedUser?.user?.email || "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-700">Preferences:</span>{" "}
              {loggedUser?.user?.preferences?.join(", ") || "N/A"}
            </p>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="flex-1 bg-gray-40 p-4 shadow rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Security</h2>
          </div>
          <button
            onClick={() => setChangePasswordOpen(true)}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600"
          >
            Change Password
          </button>
        </div>
        <ChangePasswordModal
          isOpen={isChangePasswordOpen}
          onClose={() => setChangePasswordOpen(false)}
        />
      </div>
      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-md shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Edit Personal Info
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium">DOB</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                {errors.dob && (
                  <p className="text-red-500 text-sm">{errors.dob}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  disabled
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Preferences
                </label>
                <input
                  type="text"
                  name="preferences"
                  value={formData.preferences}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                <small className="text-gray-500">
                  Separate preferences with commas.
                </small>
                {errors.preferences && (
                  <p className="text-red-500 text-sm">{errors.preferences}</p>
                )}
              </div>
            </form>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
