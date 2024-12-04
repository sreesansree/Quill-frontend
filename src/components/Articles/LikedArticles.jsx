import React, { Suspense, useEffect, useState } from "react";
import api from "../../api/api.js";
import Spinner from "../Spinner.jsx";
// import ArticleList from "../../pages/ArticleList";

const ArticleList = React.lazy(() => import("../../pages/ArticleList.jsx"));

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
      <Suspense fallback={<Spinner />}>
        <ArticleList articles={likedArticles} category="Liked Articles" />
      </Suspense>
    </div>
  );
};

export default LikedArticles;
