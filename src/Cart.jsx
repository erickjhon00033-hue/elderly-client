import React from "react";
import { Link } from "react-router-dom";

function Cart({ cart, updateQuantity, removeFromCart, clearCart }) {
  // Helper para mostrar precio
  const getPriceDisplay = (item) =>
    ((item.price_cents || item.price * 100) / 100).toFixed(2);

  // Calcular total
  const getTotal = () =>
    cart.reduce(
      (acc, item) => acc + parseFloat(getPriceDisplay(item)) * item.quantity,
      0
    );

  return (
    <div className="cart">
      <h2>🛒 Tu Carrito</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Tu carrito está vacío</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.product_id || item.id} className="cart-item">
                <img
                  src={item.image_url || item.image}
                  alt={item.name}
                  className="cart-item-img"
                />

                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>Precio: RD${getPriceDisplay(item)}</p>
                  <p>Material: {item.material}</p>

                  <div className="cart-controls">
                    <label>
                      Cantidad:
                      <input
                        type="number"
                        min="1"
                        max={item.stock}
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.product_id || item.id,
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </label>

                    <p>
                      Subtotal: RD$
                      {(parseFloat(getPriceDisplay(item)) * item.quantity).toFixed(2)}
                    </p>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.product_id || item.id)}
                    >
                      ❌ Quitar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <h3>Total: RD${getTotal().toFixed(2)}</h3>
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