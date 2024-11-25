import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaHome,
  FaPlus,
  FaFileAlt,
  FaCog,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useUser } from "../context/UserContext.jsx";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("loggedUser");
  // Parse the JSON string into an object
  // const parsedUser = JSON.parse(token);
  const { logoutUser } = useUser();

  // console.log("logged user :", parsedUser);

  const handleLogOut = () => {
    logoutUser();
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-blue-600 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/dashboard" className="text-white text-xl font-bold">
          Quill
        </Link>

        {token && (
          <>
            {/* Navbar Links */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/dashboard"
                className="flex items-center text-white hover:text-gray-200"
              >
                <FaHome className="mr-2" /> Dashboard
              </Link>
              <Link
                to="/create"
                className="flex items-center text-white hover:text-gray-200"
              >
                <FaPlus className="mr-2" /> Create
              </Link>
              <Link
                to="#"
                className="flex items-center text-white hover:text-gray-200"
              >
                <FaFileAlt className="mr-2" /> My Articles
              </Link>
              <div className="relative">
                {/* Settings Dropdown */}
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-white hover:text-gray-200"
                >
                  <FaCog className="mr-2" /> Settings
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <FaUser className="mr-2" /> Profile
                    </Link>
                    <button
                      onClick={handleLogOut}
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <button
                onClick={toggleDropdown}
                className="text-white focus:outline-none focus:ring"
              >
                <FaCog size={24} />
              </button>
              {dropdownOpen && (
                <div className="absolute top-14 right-4 w-48 bg-white rounded-lg shadow-lg">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <FaHome className="mr-2" /> Dashboard
                  </Link>
                  <Link
                    to="/create"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <FaPlus className="mr-2" /> Create
                  </Link>
                  <Link
                    to="/myarticles"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <FaFileAlt className="mr-2" /> My Articles
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <FaUser className="mr-2" /> Profile
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
