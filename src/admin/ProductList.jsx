import React, { useEffect, useState } from "react";

function ProductList({ token, onEdit, refreshTrigger }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, [refreshTrigger]);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:4000/api/admin/products", {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 importante para rutas admin
        },
      });
      const data = await res.json();

      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products); // 👈 ahora usamos el array correcto
      } else {
        setProducts([]);
        setError("No se pudieron cargar los productos");
      }
    } catch (err) {
      console.error("Error cargando productos:", err);
      setProducts([]);
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/admin/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        alert("Producto eliminado ✅");
        loadProducts();
      } else {
        alert(data.message || "Error eliminando producto ❌");
      }
    } catch (err) {
      console.error("Error eliminando producto:", err);
      alert("Error de conexión con el servidor ❌");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Lista de productos</h3>
      {loading ? (
        <p className="text-gray-600">Cargando productos...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b">Nombre</th>
              <th className="p-3 border-b">Descripción</th>
              <th className="p-3 border-b">Precio</th>
              <th className="p-3 border-b">Stock</th>
              <th className="p-3 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-3 border-b font-medium">{p.name}</td>
                <td className="p-3 border-b text-gray-600">{p.description}</td>
                <td className="p-3 border-b text-yellow-700">
                  RD${(p.price_cents / 100).toFixed(2)}
                </td>
                <td className="p-3 border-b">{p.stock}</td>
                <td className="p-3 border-b flex space-x-2">
                  <button
                    onClick={() => onEdit(p)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductList;