const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-16 h-16 border-8 border-t-4 border-blue-500 border-b-4 border-transparent rounded-full animate-spin">
        <div
          className="absolute w-16 h-16 border-8 border-t-4 border-red-500 border-b-4 border-transparent rounded-full animate-spin"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
      <div
        className="absolute w-16 h-16 border-8 border-t-4 border-green-500 border-b-4 border-transparent rounded-full animate-spin"
        style={{ animationDelay: "0.4s" }}
      ></div>
    </div>
  );
};

export default Spinner;
