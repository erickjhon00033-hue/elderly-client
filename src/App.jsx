import React, { useState } from 'react';
import logo from './assets/Logo.png';
import Products from './products';
import Cart from './Cart';
import Checkout from './Checkout';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  const [cart, setCart] = useState([]);

  // Agregar producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Quitar producto
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Vaciar carrito
  const clearCart = () => {
    setCart([]);
  };

  // Calcular total
  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price_cents * item.quantity, 0) / 100;
  };

  return (
    <div
      style={{
        backgroundColor: '#111',
        minHeight: '100vh',
        color: '#eee',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: '#222',
          borderBottom: '2px solid #444'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src={logo} alt="Logo Elderly" style={{ height: '60px' }} />
          <div>
            <h1 style={{ margin: 0 }}>Elderly</h1>
            <p style={{ fontStyle: 'italic', color: '#aaa', margin: 0 }}>
              La elegancia no envejece
            </p>
          </div>
        </div>
        <nav>
          <Link
            to="/"
            style={{ color: '#eee', marginRight: '20px', textDecoration: 'none' }}
          >
            Inicio
          </Link>
          <Link
            to="/cart"
            style={{ color: '#eee', marginRight: '20px', textDecoration: 'none' }}
          >
            Carrito ({cart.length})
          </Link>
          <Link
            to="/checkout"
            style={{ color: '#0f0', textDecoration: 'none' }}
          >
            Checkout
          </Link>
        </nav>
      </header>

      {/* Rutas */}
      <Routes>
        <Route
          path="/"
          element={
            <main style={{ flex: 1, padding: '20px' }}>
              <h2 style={{ color: '#ccc' }}>Bienvenido a la tienda Elderly</h2>
              <p style={{ color: '#aaa' }}>
                Explora nuestros productos artesanales únicos.
              </p>
              <Products addToCart={addToCart} />
            </main>
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              getTotal={getTotal}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              getTotal={getTotal}
              clearCart={clearCart}
            />
          }
        />
      </Routes>

      {/* Footer */}
      <footer
        style={{
          marginTop: 'auto',
          padding: '15px',
          textAlign: 'center',
          backgroundColor: '#222',
          borderTop: '2px solid #444',
          color: '#888'
        }}
      >
        <small>
          © {new Date().getFullYear()} Elderly — La elegancia no envejece
        </small>
      </footer>
    </div>
  );
}

export default App;