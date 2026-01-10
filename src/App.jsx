import React, { useState } from "react";
import logo from "./assets/Logo.png";
import Products from "./Products";
import Cart from "./Cart";
import Checkout from "./Checkout";
import ProductDetail from "./ProductDetail";
import Categories from "./Categories";
import Wishlist from "./Wishlist";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";

// ✅ Array de productos directamente aquí
const products = [
  {
    id: 1,
    name: "Collar Luna",
    category: "collares",
    price: 2500,
    material: "Plata",
    stock: 5,
    image: "/assets/collar-luna.jpg",
    description: "Un delicado collar inspirado en la luna y las estrellas.",
    bestseller: true,
    newArrival: false
  },
  {
    id: 2,
    name: "Collar Sol",
    category: "collares",
    price: 3200,
    material: "Oro",
    stock: 3,
    image: "/assets/collar-sol.jpg",
    description: "Collar radiante inspirado en el sol.",
    bestseller: false,
    newArrival: true
  },
  {
    id: 3,
    name: "Pulsera Estrella",
    category: "pulseras",
    price: 1800,
    material: "Cuero",
    stock: 10,
    image: "/assets/pulsera-estrella.jpg",
    description: "Pulsera ligera inspirada en las estrellas.",
    bestseller: true,
    newArrival: false
  },
  {
    id: 4,
    name: "Pulsera Aurora",
    category: "pulseras",
    price: 2200,
    material: "Acero inoxidable",
    stock: 7,
    image: "/assets/pulsera-aurora.jpg",
    description: "Pulsera elegante inspirada en la aurora boreal.",
    bestseller: false,
    newArrival: true
  }
];

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  // Wishlist toggle
  const toggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.find((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product]
    );
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

        {/* Navegación con buscador y mini‑carrito */}
        <nav className="header-nav header-nav--right">
          <Link to="/">Inicio</Link>
          <Link to="/collares">Collares</Link>
          <Link to="/pulseras">Pulseras</Link>
          <Link to="/wishlist">Favoritos</Link>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="mini-cart">
            <Link to="/cart">
              🛒 ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </Link>
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
          element={
            <Products
              products={products}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
              searchTerm={searchTerm}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetail
              products={products}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />
          }
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
        <Route
          path="/wishlist"
          element={
            <Wishlist wishlist={wishlist} toggleWishlist={toggleWishlist} />
          }
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
            <p><a href="#">Instagram</a></p>
            <p><a href="#">Facebook</a></p>
            <p><a href="#">TikTok</a></p>
          </div>
          <div>
            <h4>Políticas</h4>
            <p><a href="#">Envíos</a></p>
            <p><a href="#">Devoluciones</a></p>
            <p><a href="#">Privacidad</a></p>
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