// import React from "react";
// import { useUser } from "../context/UserContext";

const Profile = () => {
//   const { loggedUser } = useUser();
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        My Profile
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Info Section */}
        <div className="flex-1 bg-gray-50 p-4 shadow rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Personal Info</h2>
            <button className="text-blue-500 hover:text-blue-700 font-medium">
              Edit
            </button>
          </div>

          <div className="space-y-3 text-gray-600">
            <div>
              <span className="font-medium text-gray-700">Profile Image:</span>
              <img
                src={loggedUser?.profilePicture}
                alt="Profile"
                className="w-24 h-24 rounded-full mt-2"
              />
            </div>
            <p>
              <span className="font-medium text-gray-700">First Name:</span> {loggedUser?.user?.name || "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-700">Last Name:</span> {loggedUser?.lastName || "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-700">DOB:</span> {loggedUser?.dob || "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-700">Mobile Number:</span>{" "}
              {loggedUser?.phone || "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-700">Email:</span> {loggedUser?.email || "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-700">Preferences:</span>{" "}
              {loggedUser?.preferences?.join(", ") || "N/A"}
            </p>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="flex-1 bg-gray-50 p-4 shadow rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Security</h2>
          </div>
          <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
