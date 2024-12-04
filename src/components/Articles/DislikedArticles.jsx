import React, { Suspense, useEffect, useState } from "react";
import api from "../../api/api.js";
import Spinner from "../Spinner.jsx";
// import ArticleList from "../../pages/ArticleList";
const ArticleList = React.lazy(() => import("../../pages/ArticleList.jsx"));
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
      <Suspense fallback={<Spinner />}>
        <ArticleList articles={dislikedArticles} category="Disliked Articles" />{" "}
      </Suspense>
    </div>
  );
};

export default DislikedArticles;
