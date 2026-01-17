import React, { useEffect, useState } from "react";

function AdminOrders({ token }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:4000/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        setError("No se pudieron cargar las órdenes");
      }
    } catch (err) {
      console.error("Error cargando órdenes:", err);
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Órdenes de clientes</h2>
      {loading ? (
        <p className="text-gray-600">Cargando órdenes...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b">ID</th>
              <th className="p-3 border-b">Usuario</th>
              <th className="p-3 border-b">Estado</th>
              <th className="p-3 border-b">Total</th>
              <th className="p-3 border-b">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{o.id}</td>
                <td className="p-3 border-b">{o.user_id}</td>
                <td className="p-3 border-b font-medium">{o.status}</td>
                <td className="p-3 border-b text-yellow-700">
                  RD${(o.total_cents / 100).toFixed(2)}
                </td>
                <td className="p-3 border-b">
                  {new Date(o.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOrders;