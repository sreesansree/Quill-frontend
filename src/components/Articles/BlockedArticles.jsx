import { useEffect, useState, lazy, Suspense } from "react";
import api from "../../api/api";
import Spinner from "../Spinner.jsx";
// import ArticleList from "../../pages/ArticleList";
const ArticleList = lazy(() => import("../../pages/ArticleList.jsx"));

const BlockedArticles = () => {
  const [blockedArticles, setBlockedArticles] = useState([]);

  useEffect(() => {
    const fetchBlockedArticles = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("loggedUser"))?.token;

        const { data } = await api.get("/api/user/blocked", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlockedArticles(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlockedArticles();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <Suspense fallback={<Spinner />}>
        <ArticleList articles={blockedArticles} category="Blocked Articles" />
      </Suspense>
    </div>
  );
};

export default BlockedArticles;
