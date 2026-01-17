import React, { useEffect, useState } from "react";

function AdminReviews({ token }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:4000/api/admin/reviews", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.reviews)) {
        setReviews(data.reviews);
      } else {
        setError("No se pudieron cargar las reseñas");
      }
    } catch (err) {
      console.error("Error cargando reseñas:", err);
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reseñas de clientes</h2>
      {loading ? (
        <p className="text-gray-600">Cargando reseñas...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b">Producto</th>
              <th className="p-3 border-b">Usuario</th>
              <th className="p-3 border-b">Rating</th>
              <th className="p-3 border-b">Comentario</th>
              <th className="p-3 border-b">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{r.product_name}</td>
                <td className="p-3 border-b">{r.user_email}</td>
                <td className="p-3 border-b">{r.rating} ⭐</td>
                <td className="p-3 border-b">{r.comment}</td>
                <td className="p-3 border-b">
                  {new Date(r.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminReviews;