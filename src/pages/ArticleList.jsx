const ArticleList = ({ articles, category }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">{category} Articles</h3>
      {articles.length > 0 ? (
        <ul className="mt-2">
          {articles.map((article, index) => (
            <li key={index} className="py-2 px-4 bg-gray-100 rounded mb-2">
              <div
                key={article._id}
                className="border rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={article.images[0] || "/placeholder-image.jpg"}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    {article.description.slice(0, 100)}...
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Category: {article.category}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No articles found.</p>
      )}
    </div>
  );
};

export default ArticleList;
