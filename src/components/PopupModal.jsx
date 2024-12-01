import React from "react";

const PopupModal = ({ isOpen, handleAction, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-md shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Select Action
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => handleAction("Liked Article")}
            className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Liked Article
          </button>
          <button
            onClick={() => handleAction("Disliked Article")}
            className="w-full py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Disliked Article
          </button>
          <button
            onClick={() => handleAction("Blocked Article")}
            className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Blocked Article
          </button>
        </div>
        <button
          onClick={closeModal}
          className="mt-6 w-full py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PopupModal;
