import React, { useEffect, useState } from "react";
import api from "../../api/api.js";
import ArticleList from "../../pages/ArticleList";

const LikedArticles = () => {
  const [likedArticles, setLikedArticles] = useState([]);

  const fetchLikedArticle = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("loggedUser"))?.token;

      const { data } = await api.get("/api/user/liked", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLikedArticles(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchLikedArticle();
  }, []);
  return (
    <div className="flex justify-center items-center">
      {" "}
      <ArticleList articles={likedArticles} category="Liked Articles" />
    </div>
  );
};

export default LikedArticles;
