import { useEffect, useState } from "react";
import api from "../../api/api";
import ArticleList from "../../pages/ArticleList";

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
    <div>
      <ArticleList articles={blockedArticles} category="Blocked Articles" />
    </div>
  );
};

export default BlockedArticles;
