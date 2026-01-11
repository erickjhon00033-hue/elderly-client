import { useState, useEffect } from "react";
import { API_URL, getToken, setToken, clearToken, setUser as saveUser, getUser } from "../config";

export function useAuth() {
  const [user, setUser] = useState(getUser());
  const [loading, setLoading] = useState(true);

  // Al montar, intenta cargar usuario desde token
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    // Verificar token con backend
    fetch(`${API_URL}/api/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Token inválido");
        return res.json();
      })
      .then((data) => {
        // Si responde bien, asumimos que el usuario está logueado
        const loggedUser = { id: data.id, email: data.email, token };
        setUser(loggedUser);
        saveUser(loggedUser);
      })
      .catch(() => {
        clearToken();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // Login
  async function login(email, password) {
    const res = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (data.token) {
      setToken(data.token);
      const loggedUser = { id: data.user.id, email: data.user.email, token: data.token };
      setUser(loggedUser);
      saveUser(loggedUser);
    }

    return data;
  }

  // Registro
  async function register(email, password) {
    const res = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    return data;
  }

  // Logout
  function logout() {
    clearToken();
    setUser(null);
  }

  return { user, loading, login, register, logout };
}