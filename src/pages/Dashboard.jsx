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
        console.log("loggedUserrr", loggedUser);
        const { data } = await axios.get("/api/articles/preferences", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("dataa :", data);
        setArticles(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
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
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-sm text-gray-600">by {article.author?.name}</p>
            <p className="mt-2 text-gray-800 line-clamp-3">
              {article.description}
            </p>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => viewArticle(article._id)}
                className="text-blue-600 hover:underline"
              >
                View
              </button>
              <div className="flex gap-2">
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
