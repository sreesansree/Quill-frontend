import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MyArticles = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchArticles = async () => {
    setLoading(true);
    try {
      const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      const token = loggedUser?.token;

      const { data } = await axios.get("/api/articles/my-articles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setArticles(data.articles);
      setFilteredArticles(data.articles);
      const uniqueCategories = [
        "All",
        ...new Set(data.articles.map((article) => article.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(
        articles.filter((article) => article.category === category)
      );
    }
  };

  const handleEdit = (articleId) => {
    // Navigate to the edit page
    navigate(`/edit-article/${articleId}`);
  };

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
          const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
          const token = loggedUser?.token;

          await axios.delete(`/api/articles/${articleId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          toast.success("Article deleted successfully!");
          setArticles(articles.filter((article) => article._id !== articleId));
          setFilteredArticles(
            filteredArticles.filter((article) => article._id !== articleId)
          );
        } catch (error) {
          console.log(error);
          toast.error("Failed to delete article");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div>Loading...</div>{" "}
        {/* You can customize this with a spinner or skeleton loader */}
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Articles</h1>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Filter by Category
        </label>
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
      </div>

      {/* Articles Grid */}
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

      {filteredArticles.length === 0 && (
        <p className="text-center mt-6 text-gray-700">No articles found.</p>
      )}
    </div>
  );
};

export default MyArticles;
