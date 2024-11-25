import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditArticle = () => {
  const { id } = useParams(); // Get the article ID from the route
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(false);

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

  // Fetch the article data
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        const token = loggedUser?.token;

        const { data } = await axios.get(`/api/articles/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { title, description, content, category, tags, images } =
          data.article;
        setTitle(title);
        setDescription(description);
        setContent(content);
        setCategory(category);
        setTags(tags.join(", "));
        setExistingImage(images[0]); // Assuming the first image is the cover
      } catch (error) {
        console.log(error.message);
        toast.error("Failed to fetch article data");
      }
    };

    fetchArticle();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("tags", tags.split(",").map(tag => tag.trim()));
      if (coverImage) formData.append("coverImage", coverImage);
  
      console.log("FormData Content:", [...formData]); // Debugging
  
      const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      const token = loggedUser?.token;
  
      const { data } = await axios.put(`/api/articles/${id}`, formData, {
        headers: {
          "Content-Type": "application/json ",
          Authorization: `Bearer ${token}`,
        },
      });
  
      toast.success("Article updated successfully!");
      navigate("/MyArticles");
    } catch (error) {
      console.error("Update Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to update article!");
    } finally {
      setLoading(false);
    }
  };
  

  const handleCancel = () => {
    navigate("/MyArticles");
  };
  console.log("titlee : ", title);
  return (
    <div className="max-w-3xl mx-auto p-6 rounded-lg m-10 shadow-2xl">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-center underline decoration-red-700 decoration-4 underline-offset-8">
        Edit Article
      </h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a category</option>
            {categoryOptions.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            rows="6"
            required
          />
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
            Current Cover Image
          </label>
          {existingImage && (
            <img
              src={existingImage}
              alt="Current Cover"
              className="w-full h-48 object-cover mb-2"
            />
          )}
          <label className="block text-sm font-medium text-gray-700 mt-2">
            Upload New Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditArticle;
