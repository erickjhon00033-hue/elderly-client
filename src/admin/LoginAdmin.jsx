import React, { useState } from "react";

function LoginAdmin({ onLogin }) {
  const [email, setEmail] = useState("admin@elderly.com"); // 👈 fijo para admin
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        // ✅ guardar token con la misma clave que usa el dashboard
        localStorage.setItem("token", data.token);

        // ✅ pasar token y datos al App
        onLogin(data.token, data.user);

        // ✅ redirigir al dashboard
        window.location.href = "/admin";
      } else {
        setError(data.message || "Login fallido ❌");
      }
    } catch (err) {
      console.error("Error en login:", err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800">Login Admin</h2>

        <div>
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Contraseña:</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition-colors"
        >
          Iniciar sesión
        </button>

        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}

export default LoginAdmin;