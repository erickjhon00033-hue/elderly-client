import React, { useState } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import AdminOrders from "./AdminOrders";
import AdminReviews from "./AdminReviews";

function AdminDashboard({ user, token, onLogout }) {
  const [editing, setEditing] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState("products"); // 👈 controla la vista activa

  const handleLogout = () => {
    // ✅ Borra token y llama callback
    localStorage.removeItem("token");
    onLogout && onLogout();
    window.location.href = "/admin/login"; // redirige al login
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Panel de Administración Elderly
            </h1>
            <p className="text-gray-600">
              Aquí podrás crear, editar y eliminar productos, revisar pedidos y gestionar reseñas.
            </p>
          </div>
          {/* Botón de cerrar sesión */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            🚪 Cerrar sesión
          </button>
        </div>

        {/* Menú de navegación */}
        <nav className="mb-8">
          <ul className="flex space-x-6 text-lg font-medium text-gray-700">
            <li>
              <button
                onClick={() => setActiveTab("products")}
                className={`transition-colors ${
                  activeTab === "products" ? "text-yellow-600 font-bold" : "hover:text-yellow-600"
                }`}
              >
                🛒 Gestionar productos
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("orders")}
                className={`transition-colors ${
                  activeTab === "orders" ? "text-yellow-600 font-bold" : "hover:text-yellow-600"
                }`}
              >
                📦 Ver pedidos
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`transition-colors ${
                  activeTab === "reviews" ? "text-yellow-600 font-bold" : "hover:text-yellow-600"
                }`}
              >
                ⭐ Reseñas
              </button>
            </li>
          </ul>
        </nav>

        {/* Contenido dinámico */}
        {activeTab === "products" && (
          <>
            <div className="mb-10">
              <ProductForm
                token={token}
                editing={editing}
                setEditing={setEditing}
                onSuccess={() => setRefreshTrigger(refreshTrigger + 1)}
              />
            </div>
            <ProductList
              token={token}
              onEdit={setEditing}
              refreshTrigger={refreshTrigger}
            />
          </>
        )}

        {activeTab === "orders" && <AdminOrders token={token} />}
        {activeTab === "reviews" && <AdminReviews token={token} />}
      </div>
    </div>
  );
}

export default AdminDashboard;