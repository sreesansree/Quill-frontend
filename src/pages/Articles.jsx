import { useState } from "react";
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
  // Helper function to determine button classes
  const buttonClasses = (component) => {
    return activeComponent === component
      ? "bg-blue-500 text-white border-blue-500 shadow-lg hover:bg-blue-700 "
      : "border-gray-300 text-gray-700 shadow-lg active:bg-green-400";
  };
  return (
    <div className="">
      <h2 className="text-4xl text-gray-400 mt-2  mb-2 text-center font-bold">
        Articles
      </h2>
      <div className="flex justify-center space-x-4 mb-4 border-4">
        <button
          className={`border-2 m-2 w-50 p-1 rounded ${buttonClasses(
            "myArticles"
          )}`}
          onClick={() => setActiveComponent("myArticles")}
        >
          My Articles
        </button>
        <button
          className={`border-2 m-2 w-50 p-1 rounded ${buttonClasses(
            "likedArticles"
          )}`}
          onClick={() => setActiveComponent("likedArticles")}
        >
          {" "}
          Liked Articles
        </button>
        <button
          className={`border-2 m-2 w-50 p-1 rounded ${buttonClasses(
            "dislikedArticles"
          )}`}
          onClick={() => setActiveComponent("dislikedArticles")}
        >
          {" "}
          DisLiked Articles
        </button>
        <button
          className={`border-2 m-2 w-50 p-1 rounded ${buttonClasses(
            "blockedArticles"
          )}`}
          onClick={() => setActiveComponent("blockedArticles")}
        >
          Blocked Articles
        </button>
      </div>
      <div>{renderActiveComponent()}</div>
    </div>
  );
};

export default Articles;
