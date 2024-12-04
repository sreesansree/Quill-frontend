import { useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/api.js";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};
    // Check required fields
    if (!title) newErrors.title = "Title is required.";
    if (!description) newErrors.description = "Description is required.";
    if (description && description.length > 255) {
      newErrors.description = "Description must not exceed 255 characters.";
    }
    if (!content) newErrors.content = "Content is required.";
    if (!category) newErrors.category = "Category is required.";

    // Validate tags format
    if (tags && !/^[\w\s,]+$/.test(tags)) {
      newErrors.tags = "Tags should be a comma-separated list of words.";
    }

    if (coverImage && !["image/jpeg", "image/png"].includes(coverImage.type)) {
      newErrors.coverImage = "Cover image must be a valid JPEG or PNG file.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    // Basic form validation
    if (!validateForm()) {
      toast.error("Please correct the highlighted fields.");
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("tags", tags);
      if (coverImage) formData.append("coverImage", coverImage);

      const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      const token = loggedUser?.token;
      const { data } = await api.post("/api/articles/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Assuming token is stored in localStorage.
        },
      });
      toast.success("Article published successfully!");
      console.log(data);
      //Reset form
      setTitle("");
      setDescription("");
      setContent("");
      setCategory("");
      setTags("");
      setCoverImage(null);
      setPreviewImage(null);
      setErrors({});
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to publish article!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);

      // Generate preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      // Clear any previous image errors
      setErrors((prevErrors) => ({ ...prevErrors, coverImage: null }));
    }
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setContent("");
    setCategory("");
    setTags("");
    setCoverImage(null);
    setPreviewImage(null);
    setErrors({});
  };

  return (
    <div className="max-w-3xl mx-auto p-6  rounded-lg m-10 shadow-2xl">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-center underline decoration-red-700 decoration-4 underline-offset-8">
        Create an Article
      </h2>
      <form onSubmit={handlePublish}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              errors.description ? "border-red-500" : ""
            }`}
            rows="3"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              errors.category ? "border-red-500" : ""
            }`}
          >
            <option value="">Select a category</option>
            {categoryOptions.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              errors.content ? "border-red-500" : ""
            }`}
            rows="6"
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={`w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              errors.coverImage ? "border-red-500" : ""
            }`}
          />
          {errors.coverImage && (
            <p className="text-red-500 text-sm mt-1">{errors.coverImage}</p>
          )}
          {previewImage && (
            <div className="mt-4">
              <img
                src={previewImage}
                alt="Cover Preview"
                className="h-auto max-w-sm object-cover rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateArticle;
