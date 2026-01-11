import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Recuperar usuario y token desde localStorage
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser({ ...parsedUser, token: savedToken });
    } else if (savedToken) {
      // Si solo hay token guardado, mantenerlo en el estado
      setUser({ email: null, token: savedToken });
    }
  }, []);

  useEffect(() => {
    if (user) {
      // Guardar usuario y token en localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({ email: user.email })
      );
      if (user.token) {
        localStorage.setItem("token", user.token);
      }
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}