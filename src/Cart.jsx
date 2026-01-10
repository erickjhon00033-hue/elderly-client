import React from 'react';
import { Link } from 'react-router-dom';

function Cart({ cart, getTotal, updateQuantity, removeFromCart, clearCart }) {
  return (
    <div className="cart">
      <h2>🛒 Tu Carrito</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Tu carrito está vacío</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.img} alt={item.name} className="cart-item-img" />

                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>Precio: ${item.price_cents / 100}</p>

                  <div className="cart-controls">
                    <label>
                      Cantidad:
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                      />
                    </label>

                    <p>
                      Subtotal: ${(item.price_cents / 100) * item.quantity}
                    </p>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ❌ Quitar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <h3>Total: ${getTotal().toFixed(2)}</h3>
          </div>

          <div className="cart-actions">
            <button className="clear-btn" onClick={clearCart}>
              🗑️ Vaciar carrito
            </button>

            <Link to="/checkout">
              <button className="checkout-btn">Proceder al Checkout</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;