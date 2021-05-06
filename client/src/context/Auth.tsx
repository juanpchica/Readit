import React, { Children, useContext, useState } from "react";

const AuthContext = React.createContext({
  user: null,
  isAuthenticated: false,
  loginContext: (user) => {},
});

function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginContext = (user) => {
    setUser(user);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{ user, loginContext, isAuthenticated }}
      {...props}
    />
  );
}

export { AuthProvider, AuthContext };
