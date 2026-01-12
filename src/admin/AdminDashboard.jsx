import React, { useState } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import { useProducts } from "../hooks/useProducts";

function AdminDashboard({ user, token }) {
  const [editing, setEditing] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // 👉 Hook de productos con refreshTrigger
  const { products, loading, error } = useProducts(refreshTrigger);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Panel de Administración Elderly
        </h1>
        <p className="text-gray-600 mb-6">
          Aquí podrás crear, editar y eliminar productos sin tocar código.
        </p>

        {/* Menú de navegación */}
        <nav className="mb-8">
          <ul className="flex space-x-6 text-lg font-medium text-gray-700">
            <li>
              <a
                href="/admin/products"
                className="hover:text-yellow-600 transition-colors"
              >
                🛒 Gestionar productos
              </a>
            </li>
            <li>
              <a
                href="/admin/orders"
                className="hover:text-yellow-600 transition-colors"
              >
                📦 Ver pedidos
              </a>
            </li>
            <li>
              <a
                href="/admin/reviews"
                className="hover:text-yellow-600 transition-colors"
              >
                ⭐ Reseñas
              </a>
            </li>
          </ul>
        </nav>

        {/* Formulario para crear/editar productos */}
        <div className="mb-10">
          <ProductForm
            user={user}
            token={token}
            editing={editing}
            setEditing={setEditing}
            onSuccess={() => setRefreshTrigger(refreshTrigger + 1)}
          />
        </div>

        {/* Lista de productos */}
        <div>
          {loading && <p>Cargando productos...</p>}
          {error && <p className="text-red-600">Error: {error}</p>}
          {!loading && !error && (
            <ProductList
              products={products}
              token={token}
              onEdit={setEditing}
              onChange={() => setRefreshTrigger(refreshTrigger + 1)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;