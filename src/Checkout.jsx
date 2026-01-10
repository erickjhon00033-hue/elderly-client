import React, { useState } from 'react';

function Checkout({ cart, getTotal, clearCart }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.paymentMethod === 'card') {
      alert(`✅ Pago con tarjeta confirmado!\n
Cliente: ${formData.name}\n
Correo: ${formData.email}\n
Dirección: ${formData.address}\n
Tarjeta: **** **** **** ${formData.cardNumber.slice(-4)}\n
Total: $${getTotal().toFixed(2)}\n
Gracias por comprar en Elderly ✨`);
    } else {
      alert(`✅ Pago con PayPal confirmado!\n
Cliente: ${formData.name}\n
Correo: ${formData.email}\n
Dirección: ${formData.address}\n
Método: PayPal\n
Total: $${getTotal().toFixed(2)}\n
Gracias por comprar en Elderly ✨`);
    }

    clearCart();
  };

  return (
    <div style={{ padding: '20px', color: '#eee' }}>
      <h2>🧾 Checkout</h2>
      {cart.length === 0 ? (
        <p style={{ color: '#aaa' }}>Tu carrito está vacío</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxWidth: '400px'
          }}
        >
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #444', marginTop: '5px' }}
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
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #444', marginTop: '5px' }}
            />
          </label>

          <label>
            Dirección:
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #444', marginTop: '5px' }}
            />
          </label>

          <label>
            Método de pago:
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #444', marginTop: '5px' }}
            >
              <option value="card">Tarjeta de crédito/débito</option>
              <option value="paypal">PayPal</option>
            </select>
          </label>

          {formData.paymentMethod === 'card' && (
            <>
              <label>
                Número de tarjeta:
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #444', marginTop: '5px' }}
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
                  style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #444', marginTop: '5px' }}
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
                  style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #444', marginTop: '5px' }}
                />
              </label>
            </>
          )}

          <p><strong>Total: ${getTotal().toFixed(2)}</strong></p>

          <button
            type="submit"
            style={{
              padding: '10px 15px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Confirmar compra
          </button>
        </form>
      )}
    </div>
  );
}

export default Checkout;