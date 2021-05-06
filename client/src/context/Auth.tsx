import React, { useContext, useState } from "react";

const AuthContext = React.createContext({ user: null, isAuthenticated: false });

function AuthProvider() {
  const [user, setUser] = useState(null);

  return <AuthContext.Provider value={user}></AuthContext.Provider>;
}

export default AuthProvider;
