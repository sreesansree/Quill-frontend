import  { useState } from "react";
import MyArticles from "./MyArticles";
import LikedArticles from "../components/Articles/LikedArticles";
import DislikedArticles from "../components/Articles/DislikedArticles";
import BlockedArticles from "../components/Articles/BlockedArticles";

const Articles = () => {
  // State to track which component to show
  const [activeComponent, setActiveComponent] = useState("myArticles");

  // Function to render the active component based on the state
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "myArticles":
        return <MyArticles />;
      case "likedArticles":
        return <LikedArticles />;
      case "dislikedArticles":
        return <DislikedArticles />;
      case "blockedArticles":
        return <BlockedArticles />;
      default:
        return null;
    }
  };
  return (
    <div className="">
      <h2>Articles</h2>
      <div className="flex justify-center space-x-4 mb-4 ">
        <button onClick={() => setActiveComponent("myArticles")}>
          My Articles
        </button>
        <button onClick={() => setActiveComponent("likedArticles")}>
          {" "}
          Liked Articles
        </button>
        <button onClick={() => setActiveComponent("dislikedArticles")}>
          {" "}
          DisLiked Articles
        </button>
        <button onClick={() => setActiveComponent("blockedArticles")}>
          Blocked Articles
        </button>
      </div>
      <div>{renderActiveComponent()}</div>
    </div>
  );
};

export default Articles;
