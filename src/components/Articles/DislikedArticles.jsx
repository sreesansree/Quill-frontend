import { useEffect, useState } from "react";
import ArticleList from "../../pages/ArticleList";
import api from "../../api/api.js";

const DislikedArticles = () => {
  const [dislikedArticles, setDislikedArticles] = useState([]);
  useEffect(() => {
    const fetchDislikedArticles = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("loggedUser"))?.token;
        const { data } = await api.get("/api/user/disliked", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDislikedArticles(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDislikedArticles();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <ArticleList articles={dislikedArticles} category="Disliked Articles" />{" "}
    </div>
  );
};

export default DislikedArticles;
