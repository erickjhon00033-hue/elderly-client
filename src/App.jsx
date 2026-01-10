import React, { useState } from 'react';
import logo from './assets/Logo.png'; // asegúrate que el archivo esté en minúsculas
import Products from './products';
import Cart from './Cart';
import Checkout from './Checkout';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const location = useLocation();
  const isHome = location.pathname === '/';

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
    <div className="app">
      {/* Header */}
      <header className={isHome ? 'header header--home' : 'header'}>
        {/* Marca centrada con logo clickeable */}
        <div className="header-brand">
          <Link to="/">
            <img src={logo} alt="Logo Elderly" />
          </Link>
          <div>
            <h1>Elderly</h1>
            <p className="slogan">La elegancia no envejece</p>
          </div>
        </div>

        {/* Navegación a la derecha */}
        <nav className="header-nav header-nav--right">
          <Link to="/">Inicio</Link>
          <Link to="/cart">Carrito ({cart.length})</Link>
          <Link to="/checkout">Checkout</Link>
        </nav>
      </header>

      {/* Rutas */}
      <Routes>
        <Route
          path="/"
          element={
            <main className="home-content">
              <h2>Bienvenido a la tienda Elderly</h2>
              <p>Explora nuestros productos artesanales únicos.</p>
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
      <footer>
        <small>© {new Date().getFullYear()} Elderly — La elegancia no envejece</small>
      </footer>
    </div>
  );
}

export default App;