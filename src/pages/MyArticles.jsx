import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import ArticleList from "./ArticleList";
import api from "../api/api.js";

const MyArticles = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);

  // State for Liked, Disliked, and Blocked Articles
  const [likedArticles, setLikedArticles] = useState([]);
  const [dislikedArticles, setDislikedArticles] = useState([]);
  const [blockedArticles, setBlockedArticles] = useState([]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("loggedUser"))?.token;
      const { data } = await api.get("/api/articles/my-articles", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setArticles(data.articles);
      setFilteredArticles(data.articles);
      setCategories(["All", ...new Set(data.articles.map((a) => a.category))]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  };

  const fetchPopupData = async (action) => {
    const endpointMap = {
      "Liked Article": "/api/user/liked",
      "Disliked Article": "/api/user/disliked",
      "Blocked Article": "/api/user/blocked",
    };
    try {
      const token = JSON.parse(localStorage.getItem("loggedUser"))?.token;
      const { data } = await api.get(endpointMap[action], {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (action === "Liked Article") setLikedArticles(data);
      if (action === "Disliked Article") setDislikedArticles(data);
      if (action === "Blocked Article") setBlockedArticles(data);

      toast.success(`${action} fetched successfully`);
    } catch (error) {
      console.error(`Failed to fetch ${action}`, error);
      toast.error(`Failed to fetch ${action}`);
    }
    setPopupOpen(false);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFilteredArticles(
      category === "All"
        ? articles
        : articles.filter((article) => article.category === category)
    );
  };

  const handleEdit = (articleId) => navigate(`/edit-article/${articleId}`);

  const handleDelete = async (articleId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = JSON.parse(localStorage.getItem("loggedUser"))?.token;
          await api.delete(`/api/articles/${articleId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setArticles(articles.filter((article) => article._id !== articleId));
          setFilteredArticles(
            filteredArticles.filter((article) => article._id !== articleId)
          );
          toast.success("Article deleted successfully!");
        } catch (error) {
          console.error("Error deleting article", error);
          toast.error("Failed to delete article");
        }
      }
    });
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Articles</h1>
      <ToastContainer />
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Filter by Category
        </label>
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((category, idx) => (
              <option key={idx} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            onClick={() => setPopupOpen(true)}
            className="bg-blue-400 text-white font-semibold px-3 py-1 rounded-full shadow-lg"
          >
            View
          </button>
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-md shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Select Action
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => fetchPopupData("Liked Article")}
                className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Liked Articles
              </button>
              <button
                onClick={() => fetchPopupData("Disliked Article")}
                className="w-full py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                Disliked Articles
              </button>
              <button
                onClick={() => fetchPopupData("Blocked Article")}
                className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Blocked Articles
              </button>
            </div>
            <button
              onClick={() => setPopupOpen(false)}
              className="mt-6 w-full py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article._id}
            className="border rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={article.images[0] || "/placeholder-image.jpg"}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{article.title}</h3>
              <p className="text-sm text-gray-700 mb-4">
                {article.description.slice(0, 100)}...
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Category: {article.category}
              </p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleEdit(article._id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit className="inline-block mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(article._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash className="inline-block mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {likedArticles.length > 0 && (
        <ArticleList articles={likedArticles} category="Liked Articles" />
      )}
      {dislikedArticles.length > 0 && (
        <ArticleList articles={dislikedArticles} category="Disliked Articles" />
      )}
      {blockedArticles.length > 0 && (
        <ArticleList articles={blockedArticles} category="Blocked Articles" />
      )}

      {filteredArticles.length === 0 && (
        <p className="text-center mt-6 text-gray-700">No articles found.</p>
      )}
    </div>
  );
};

export default MyArticles;
