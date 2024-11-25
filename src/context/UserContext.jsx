import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // State for registration data
  const [registeredUser, setRegisteredUser] = useState(null);

  // State for logged-in user data
  const [loggedUser, setLoggedUser] = useState(null);

  // Function to handle user login
  const loginUser = (userData) => {
    setLoggedUser(userData);
    // Optionally save to localStorage for persistence
    localStorage.setItem("loggedUser", JSON.stringify(userData));
  };

  // Function to handle user logout
  const logoutUser = () => {
    setLoggedUser(null);
    localStorage.removeItem("loggedUser");
  };

  return (
    <UserContext.Provider
      value={{
        registeredUser,
        setRegisteredUser,
        loggedUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
