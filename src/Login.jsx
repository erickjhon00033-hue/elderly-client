import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { setToken, setUser as setUserLocal } from "./config"; 
import { useCart } from "./hooks/useCart"; 

function Login() {
  const userContext = useContext(UserContext);
  const setUser = userContext?.setUser; 

  const { syncCartLocalToBackend } = useCart(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  // 🔑 Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      console.log("Respuesta backend login:", data);

      // ✅ Ajuste: usar directamente data.user y fallback si no existe
if (data.success && data.token) {
  setToken(data.token);

  // ✅ Usa directamente data.user, con fallback mínimo
  const userData = data.user || { email };

  setUserLocal(userData);
  if (setUser) {
    setUser({ email: userData.email, token: data.token });
  }

  await syncCartLocalToBackend();

  alert("✅ Sesión iniciada correctamente");
  window.location.href = "/";
} else {
  alert(data.message || "Credenciales incorrectas");
}
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error de conexión con el servidor");
    }
  };

  // 📝 Registro
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      console.log("Respuesta backend register:", data);

      if (data.success) {
        alert("✅ Cuenta creada, ahora inicia sesión");
        setShowRegister(false);
      } else {
        alert(data.message || "Error al registrarse");
      }
    } catch (error) {
      console.error("Error en registro:", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="auth-container">
      {!showRegister ? (
        <form onSubmit={handleLogin} className="auth-form">
          <h2>Iniciar sesión</h2>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
          <p>
            ¿No tienes cuenta?{" "}
            <button
              type="button"
              onClick={() => setShowRegister(true)}
              className="link-button"
            >
              Regístrate aquí
            </button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="auth-form">
          <h2>Registrarse</h2>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Crear cuenta</button>
          <p>
            ¿Ya tienes cuenta?{" "}
            <button
              type="button"
              onClick={() => setShowRegister(false)}
              className="link-button"
            >
              Inicia sesión aquí
            </button>
          </p>
        </form>
      )}
    </div>
  );
}

export default Login;