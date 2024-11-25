import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const loggedUser = localStorage.getItem("loggedUser");
  const token = loggedUser ? JSON.parse(loggedUser).token : null;

  // If no token is found, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
