// ==========================
// Configuración del cliente Elderly
// ==========================

// URL base del backend (ajústalo en tu .env si cambias el puerto)
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// ==========================
// Funciones auxiliares de autenticación
// ==========================

// Obtener token guardado en localStorage
export function getToken() {
  return localStorage.getItem("token");
}

// Guardar token en localStorage
export function setToken(token) {
  localStorage.setItem("token", token);
}

// Eliminar token (logout)
export function clearToken() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

// Guardar usuario en localStorage
export function setUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

// Obtener usuario guardado
export function getUser() {
  const saved = localStorage.getItem("user");
  return saved ? JSON.parse(saved) : null;
}

// ==========================
// Fetch con autenticación automática
// ==========================
export async function apiFetch(endpoint, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Manejo de errores
  if (res.status === 401) {
    // Token inválido o expirado → logout automático
    clearToken();
    throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.");
  }

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error ${res.status}: ${errorText}`);
  }

  return res.json();
}