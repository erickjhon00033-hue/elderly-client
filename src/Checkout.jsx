import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ para el botón "Ir a la tienda"

function Checkout({ cart, clearCart }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  // Helper para mostrar precio
  const getPriceDisplay = (item) =>
    ((item.price_cents || item.price * 100) / 100).toFixed(2);

  // Calcular total
  const getTotal = () =>
    cart.reduce(
      (acc, item) => acc + parseFloat(getPriceDisplay(item)) * item.quantity,
      0
    );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // usuario logueado
      const items = cart.map((item) => ({
        name: item.name,
        price_cents: item.price_cents || item.price * 100,
        quantity: item.quantity,
      }));

      const res = await fetch("http://localhost:4000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (data.success) {
        // Redirigir al checkout de Stripe
        window.location.href = data.url;
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Error al iniciar checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout">
      <h2>🧾 Checkout</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h3>🛒 Tu carrito está vacío</h3>
          <p>Explora nuestros productos artesanales únicos y agrega tus favoritos.</p>
          <Link to="/" className="back-button">
            Ir a la tienda
          </Link>
        </div>
      ) : (
        <>
          {/* Resumen del carrito */}
          <div className="checkout-summary">
            <h3>Resumen de tu pedido:</h3>
            <ul>
              {cart.map((item) => (
                <li key={item.product_id || item.id}>
                  {item.name} x{item.quantity} — RD$
                  {(parseFloat(getPriceDisplay(item)) * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <p>
              <strong>Total: RD${getTotal().toFixed(2)}</strong>
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="checkout-form">
            <label>
              Nombre:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Correo:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Dirección:
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </label>

            {/* ✅ Botón estilizado */}
            <button type="submit" className="pay-button" disabled={loading}>
              {loading ? "Procesando..." : "Pagar"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Checkout;