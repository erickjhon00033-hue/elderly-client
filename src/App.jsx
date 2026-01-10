import React, { useState } from "react";
import logo from "./assets/Logo.png";
import Products from "./Products"; // ✅ componente
import Cart from "./Cart";
import Checkout from "./Checkout";
import ProductDetail from "./ProductDetail";
import Categories from "./Categories";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import { products } from "./products"; // ✅ datos (named export)

function App() {
  const [cart, setCart] = useState([]);
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Añadir producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };

  // Actualizar cantidad
  const updateQuantity = (id, newQty) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Eliminar producto
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Vaciar carrito
  const clearCart = () => {
    setCart([]);
  };

  // Calcular total
  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="app">
      {/* Header */}
      <header className={isHome ? "header header--home" : "header"}>
        <div className="header-brand">
          <Link to="/">
            <img src={logo} alt="Logo Elderly" />
          </Link>
          <div>
            <h1>Elderly</h1>
            <p className="slogan">La elegancia no envejece</p>
          </div>
        </div>

        {/* Navegación con mini‑carrito */}
        <nav className="header-nav header-nav--right">
          <Link to="/">Inicio</Link>
          <Link to="/collares">Collares</Link>
          <Link to="/pulseras">Pulseras</Link>
          <div className="mini-cart">
            <Link to="/cart">
              🛒 ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </Link>
            <div className="mini-cart-dropdown">
              {cart.length === 0 ? (
                <p>Carrito vacío</p>
              ) : (
                <ul>
                  {cart.map((item) => (
                    <li key={item.id}>
                      {item.name} x{item.quantity}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
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
              <Categories />
            </main>
          }
        />
        <Route
          path="/:category"
          element={<Products addToCart={addToCart} />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetail addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={<Checkout cart={cart} clearCart={clearCart} />}
        />
      </Routes>

      {/* Footer */}
      <footer>
        <div className="footer-links">
          <div>
            <h4>Contacto</h4>
            <p>Email: contacto@elderly.com</p>
            <p>Tel: +1 809 000 0000</p>
          </div>
          <div>
            <h4>Redes</h4>
            <p>
              <a href="#">Instagram</a>
            </p>
            <p>
              <a href="#">Facebook</a>
            </p>
            <p>
              <a href="#">TikTok</a>
            </p>
          </div>
          <div>
            <h4>Políticas</h4>
            <p>
              <a href="#">Envíos</a>
            </p>
            <p>
              <a href="#">Devoluciones</a>
            </p>
            <p>
              <a href="#">Privacidad</a>
            </p>
          </div>
        </div>
        <small>
          © {new Date().getFullYear()} Elderly — La elegancia no envejece
        </small>
      </footer>
    </div>
  );
}

export default App;