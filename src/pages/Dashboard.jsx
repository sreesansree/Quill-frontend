import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import Spinner from "../components/Spinner";
import api from "../api/api.js";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useAuth();
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        const token = loggedUser?.token;
        const userId = loggedUser?  .user?._id;
        const { data } = await api.get("/api/articles/preferences", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Filter out articles blocked by the current user
        const filteredArticles = data.filter(
          (article) => !article.blocks.includes(userId)
        );
        console.log(loggedUser);
        console.log("Dataa", filteredArticles);
        console.log("userId", userId);
        setArticles(filteredArticles);
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
    const article = articles.find((article) => article._id === articleId);
    if (article.likedByUser) {
      toast.info("You already liked this article!");
      return;
    }

    try {
      const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      const token = loggedUser?.token;

      const { data } = await api.post(
        `/api/user/${articleId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article._id === articleId
            ? {
                ...article,
                likes: data.article.likes, // Use updated likes array from backend
                dislikes: data.article.dislikes,
                likedByUser: true,
                dislikedByUser: false,
              }
            : article
        )
      );

      toast.success("Liked the article!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to like the article!");
    }
  };

  const handleDislike = async (articleId) => {
    const article = articles.find((article) => article._id === articleId);
    if (article.dislikedByUser) {
      toast.info("You already disliked this article!");
      return;
    }

    try {
      const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      const token = loggedUser?.token;

      const { data } = await api.post(
        `/api/user/${articleId}/dislike`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article._id === articleId
            ? {
                ...article,
                likes: data.article.likes, // Use updated likes array from backend
                dislikes: data.article.dislikes,
                likedByUser: false,
                dislikedByUser: true,
              }
            : article
        )
      );

      toast.success("Disliked the article!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to dislike the article!");
    }
  };

  const handleBlock = async (articleId) => {
    try {
      const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      const token = loggedUser?.token;

      await api.post(
        `/api/user/${articleId}/block`,
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
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner />
        {/* You can customize this with a spinner or skeleton loader */}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col justify-center items-center m-2">
      <ToastContainer />
      <h1 className="text-4xl font-bold mb-8 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 max-w-6xl  gap-8">
        {articles.map((article) => (
          <div
            key={article._id}
            className="border rounded-lg p-8 shadow-lg hover:shadow-2xl "
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
              <strong>{new Date(article.createdAt).toLocaleString()}</strong>
            </p>
            <p className="text-sm text-blue-500 mb-4 underline">
              <>#{article.tags.join(" #")}</>
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
                  className={`text-green-600 hover:underline ${
                    article.likedByUser ? "cursor-not-allowed" : ""
                  }`}
                  disabled={article.likedByUser}
                >
                  <FaThumbsUp /> Like ({article.likes.length})
                </button>
                <button
                  onClick={() => handleDislike(article._id)}
                  className={`text-yellow-600 hover:underline ${
                    article.dislikedByUser ? "cursor-not-allowed" : ""
                  }`}
                  disabled={article.dislikedByUser}
                >
                  <FaThumbsDown /> Dislike
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
