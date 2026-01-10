import React, { useState } from "react";

function Checkout({ cart, clearCart }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: ""
  });

  // Calcular total
  const getTotal = () =>
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    if (formData.paymentMethod === "card") {
      alert(`✅ Pago con tarjeta confirmado!
Cliente: ${formData.name}
Correo: ${formData.email}
Dirección: ${formData.address}
Tarjeta: **** **** **** ${formData.cardNumber.slice(-4)}
Total: RD$${getTotal().toFixed(2)}
Gracias por comprar en Elderly ✨`);
    } else {
      alert(`✅ Pago con PayPal confirmado!
Cliente: ${formData.name}
Correo: ${formData.email}
Dirección: ${formData.address}
Método: PayPal
Total: RD$${getTotal().toFixed(2)}
Gracias por comprar en Elderly ✨`);
    }

    clearCart();
    setFormData({
      name: "",
      email: "",
      address: "",
      paymentMethod: "card",
      cardNumber: "",
      cardExpiry: "",
      cardCVV: ""
    });
  };

  return (
    <div className="checkout">
      <h2>🧾 Checkout</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Tu carrito está vacío</p>
      ) : (
        <>
          {/* Resumen del carrito */}
          <div className="checkout-summary">
            <h3>Resumen de tu pedido:</h3>
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  {item.name} x{item.quantity} — RD$
                  {(item.price * item.quantity).toFixed(2)}
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

            <label>
              Método de pago:
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="card">Tarjeta de crédito/débito</option>
                <option value="paypal">PayPal</option>
              </select>
            </label>

            {formData.paymentMethod === "card" && (
              <>
                <label>
                  Número de tarjeta:
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Fecha de vencimiento:
                  <input
                    type="text"
                    name="cardExpiry"
                    placeholder="MM/AA"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  CVV:
                  <input
                    type="text"
                    name="cardCVV"
                    value={formData.cardCVV}
                    onChange={handleChange}
                    required
                  />
                </label>
              </>
            )}

            <button type="submit">Confirmar compra</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Checkout;