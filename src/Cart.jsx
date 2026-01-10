import React from 'react';
import { Link } from 'react-router-dom';

function Cart({ cart, getTotal, removeFromCart, clearCart }) {
  return (
    <div style={{ padding: '20px', color: '#eee' }}>
      <h2>🛒 Tu Carrito</h2>

      {cart.length === 0 ? (
        <p style={{ color: '#aaa' }}>Tu carrito está vacío</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map((item) => (
              <li
                key={item.id}
                style={{
                  marginBottom: '15px',
                  backgroundColor: '#222',
                  padding: '10px',
                  borderRadius: '8px'
                }}
              >
                <strong>{item.name}</strong>
                <br />
                Cantidad: {item.quantity}
                <br />
                Subtotal: ${(item.price_cents / 100) * item.quantity}
                <br />
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    marginTop: '8px',
                    padding: '6px 12px',
                    backgroundColor: '#444',
                    color: '#eee',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  ❌ Quitar
                </button>
              </li>
            ))}
          </ul>

          <p style={{ marginTop: '10px' }}>
            <strong>Total: ${getTotal().toFixed(2)}</strong>
          </p>

          <button
            onClick={clearCart}
            style={{
              marginTop: '15px',
              padding: '10px 15px',
              backgroundColor: '#900',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            🗑️ Vaciar carrito
          </button>

          <div style={{ marginTop: '20px' }}>
            <Link
              to="/checkout"
              style={{
                padding: '10px 15px',
                backgroundColor: '#28a745',
                color: '#fff',
                borderRadius: '5px',
                textDecoration: 'none'
              }}
            >
              Proceder al Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;