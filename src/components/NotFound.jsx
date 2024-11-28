
const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-800 to-blue-400 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl">Page Not Found</p>
      <p className="mt-4 text-lg">
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        onClick={() => (window.location.href = "/")}
        className="mt-6 px-6 py-2 bg-white text-blue-800 rounded-lg shadow hover:bg-gray-100"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default NotFound;
