import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        const token = loggedUser?.token;

        const { data } = await axios.get(
          `/api/articles/article-details/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setArticle(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load article details!");
        setLoading(false);
      }
    };

    fetchArticleDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!article) return <div>Article not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ToastContainer />
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-600 mb-2">
        by {article.author?.firstName} {article.author?.lastName}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        <strong>{new Date(article.createdAt).toLocaleString()}</strong>
      </p>
      <div className="text-sm text-blue-500 mb-4">
     #{article.tags.join(" #")}
      </div>
      <img
        src={article.images[0] || "/placeholder-image.jpg"}
        alt={article.title}
        className="w-full h-80 object-cover mb-5 rounded-lg"
      />
      <p className="text-gray-800">{article.description}</p>
      <div className="mt-6">{article.content}</div>
    </div>
  );
};

export default ArticleDetails;
