import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        const token = loggedUser?.token;
        const { data } = await axios.get("/api/articles/preferences", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("dataa :", data);
        setArticles(data);
        setLoading(false);
      } catch (error) {
        console.log("Error Message : ", error.message);
        toast.error("Failed to load articles!");
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleLike = async (articleId) => {
    try {
      const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      const token = loggedUser?.token;

      await axios.post(
        `/api/articles/${articleId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Liked the article!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to like the article!");
    }
  };

  const handleDislike = async (articleId) => {
    try {
      const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      const token = loggedUser?.token;

      await axios.post(
        `/api/articles/${articleId}/dislike`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Disliked the article!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to dislike the article!");
    }
  };

  const handleBlock = async (articleId) => {
    try {
      const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      const token = loggedUser?.token;

      await axios.post(
        `/api/articles/${articleId}/block`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Blocked the article!");
      setArticles(articles.filter((article) => article._id !== articleId)); // Remove blocked article
    } catch (error) {
      console.log(error);
      toast.error("Failed to block the article!");
    }
  };

  const viewArticle = (articleId) => {
    navigate(`/articles/${articleId}`); // Navigate to a separate page to view the article
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col justify-center items-center m-2">
      <h1 className="text-4xl font-bold mb-8 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 max-w-6xl  gap-8">
        {articles.map((article) => (
          <div
            key={article._id}
            className="border rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="relative">
              <h2 className="absolute top-4 right-4 bg-blue-400 text-white font-semibold px-3 py-1 rounded-full shadow-lg">
                {article.category}
              </h2>
              <h2 className="text-3xl font-semibold mb-3">{article.title}</h2>
            </div>

            <p className="text-sm text-gray-600 mb-3">
              by {article.author?.firstName} {article.author?.lastName}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              <strong></strong> {new Date(article.createdAt).toLocaleString()}
            </p>
            <img
              src={article.images[0] || "/placeholder-image.jpg"}
              alt={article.title}
              className="w-full h-80 object-cover mb-5 rounded-lg"
            />
            <p className="text-gray-800 line-clamp-3 mb-6">
              {article.description}
            </p>
            <div className="flex justify-between items-center">
              <button
                onClick={() => viewArticle(article._id)}
                className="text-blue-600 hover:underline"
              >
                View
              </button>
              <div className="flex gap-4">
                <button
                  onClick={() => handleLike(article._id)}
                  className="text-green-600 hover:underline"
                >
                  Like
                </button>
                <button
                  onClick={() => handleDislike(article._id)}
                  className="text-yellow-600 hover:underline"
                >
                  Dislike
                </button>
                <button
                  onClick={() => handleBlock(article._id)}
                  className="text-red-600 hover:underline"
                >
                  Block
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
