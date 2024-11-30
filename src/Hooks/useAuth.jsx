import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    const token = loggedUser ? JSON.parse(loggedUser).token : null;
    if (!token) {
      navigate("/login");
    }
  }, []);
};

export default useAuth;
