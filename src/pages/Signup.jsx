import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast styling
import api from "../api/api.js";

const Signup = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setRegisteredUser } = useUser();

  const categoryOptions = [
    "Technology",
    "Health",
    "Sports",
    "Politics",
    "Business",
    "Education",
    "Lifestyle",
    "Travel",
    "Food",
    "Science",
    "Entertainment",
  ];

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== value)
      );
    }
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors("");
  };

  const validate = () => {
    const validationErrors = {};
    if (!formData.firstName) {
      validationErrors.firstName = "First name is required.";
    }
    if (!formData.lastName) {
      validationErrors.lastName = "Last name is required.";
    }
    if (!formData.email) {
      validationErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Invalid email format.";
    }
    if (!formData.phone) {
      validationErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      validationErrors.phone = "Phone number must be 10 digits.";
    }
    if (!formData.dob) {
      validationErrors.dob = "Date of birth is required.";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters.";
    }
    if (!formData.confirmPassword) {
      validationErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    const completeData = { ...formData, preferences: selectedCategories };
    setRegisteredUser(completeData.email);
    // try {
    //   const res = await fetch("/api/auth/register", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(completeData),
    //   });
    //   const data = await res.json();
    //   console.log(data);
    //   if (res.ok) {
    //     // Display success message
    //     toast.success(data.message || "Signup successful!");
    //     setTimeout(() => {
    //       navigate("/otp-verification");
    //     }, 3000);
    //   } else {
    //     // Display error message
    //     toast.error(data.message || "An error occurred during signup.");
    //   }
    //   // navigate('/otp-verification')
    // } catch (error) {
    //   console.error(error);
    //   toast.error("Network error. Please try again later.");
    // }
    try {
      const response = await api.post("/api/auth/register", completeData, {
        headers: { "Content-Type": "application/json" },
      });

      // Check if the response status is 200 (OK)
      if (response.status === 200) {
        // Display success message
        toast.success(response.data.message || "Signup successful!");
        setTimeout(() => {
          navigate("/otp-verification");
        }, 3000);
      } else {
        toast.error(
          response.data.message || "An error occurred during signup."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error. Please try again later.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center  bg-gradient-to-r from-cyan-500 to-blue-500">
      <ToastContainer />
      <div className="w-full m-4 max-w-md p-6 bg-white/30  backdrop-blur-sm rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Create Your Quill Account
        </h2>
        <p className="text-sm text-gray-600 text-center">
          Sign up to start writing
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex gap-2">
            <div className="mb-4">
              <input
                type="text"
                id="firstName"
                placeholder="Enter your First Name"
                className={`w-full px-4 py-2 bg-white/30 backdrop-blur-sm mt-1 text-gray-900 border ${
                  errors.firstName
                    ? "border-red-500 animate-pulse"
                    : "border-gray-300"
                } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500 ">{errors.firstName}</p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="lastName"
                placeholder="Enter your Last Name"
                className={`w-full px-4 py-2 bg-white/30 backdrop-blur-sm mt-1 text-gray-900 border ${
                  errors.lastName
                    ? "border-red-500 animate-pulse"
                    : "border-gray-300"
                } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className={`w-full px-4 py-2 mt-1 bg-white/30 backdrop-blur-sm text-gray-700 border ${
                errors.email
                  ? "border-red-500 animate-pulse"
                  : "border-gray-300"
              } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-sm text-red-500 ">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="tel"
              id="phone"
              placeholder="Enter your mobile number"
              className={`w-full px-4 py-2 mt-1 bg-white/30 backdrop-blur-sm text-gray-700 border ${
                errors.phone
                  ? "border-red-500 animate-pulse"
                  : "border-gray-300"
              } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-sm text-red-500 ">{errors.phone}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="date"
              id="dob"
              className={`w-full px-4 py-2 mt-1 bg-white/30 backdrop-blur-sm text-gray-700 border ${
                errors.dob ? "border-red-500 animate-pulse" : "border-gray-300"
              } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
              onChange={handleChange}
            />
            {errors.dob && <p className="text-sm text-red-500">{errors.dob}</p>}
          </div>

          <div className="mb-4">
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              className={`w-full px-4 py-2 mt-1 bg-white/30 backdrop-blur-sm text-gray-700 border ${
                errors.password
                  ? "border-red-500 animate-pulse"
                  : "border-gray-300"
              } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-sm text-red-500 ">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              className={`w-full px-4 py-2 mt-1 bg-white/30 backdrop-blur-sm text-gray-700 border ${
                errors.confirmPassword
                  ? "border-red-500 animate-pulse"
                  : "border-gray-300"
              } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
          <div className="mb-4">
            <button
              type="button"
              onClick={toggleModal}
              className="w-full px-4 py-2 mt-1   backdrop-blur-sm text-white bg-blue-400 rounded-lg hover:bg-blue-700"
              onChange={handleChange}
            >
              Choose Article Preferences
            </button>
            {selectedCategories.length > 0 && (
              <p className="mt-2 text-sm text-gray-500">
                Selected: {selectedCategories.join(", ")}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="transition ease-in-out delay-150 duration-300  hover:-translate-y-1 hover:scale-100 w-full px-4 py-2 text-white bg-blue-600 rounded-lg shadow-blue-500/50  hover:bg-blue-700 hover:shadow-blue-500 /50 focus:ring-4 focus:ring-blue-300 shadow-xl"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login " className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-full max-w-lg p-6   bg-white/30 backdrop-blur-sm rounded-lg shadow-md">
            <h3 className="text-xl  flex justify-center font-semibold text-gray-800">
              Select Article Preferences
            </h3>
            <div className="mt-4 max-h-60 overflow-y-auto">
              {categoryOptions.map((category, index) => (
                <div key={index} className="flex items-center  space-x-6 mb-2">
                  <input
                    type="checkbox"
                    id={`modal-category-${index}`}
                    value={category}
                    onChange={handleCheckboxChange}
                    checked={selectedCategories.includes(category)}
                    className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`modal-category-${index}`}
                    className="text-sm text-gray-700"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                type="button"
                onClick={toggleModal}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={toggleModal}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
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

export default Signup;
