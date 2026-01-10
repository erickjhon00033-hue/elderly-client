import React, { useState } from "react";
import logo from "./assets/Logo.png";
import Products from "./Products";
import Cart from "./Cart";
import Checkout from "./Checkout";
import ProductDetail from "./ProductDetail";
import Categories from "./Categories";
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
    gallery: [
      "/assets/collar-luna.jpg",
      "/assets/collar-luna2.jpg",
      "/assets/collar-luna3.jpg"
    ],
    description: "Un delicado collar inspirado en la luna y las estrellas.",
    features: ["Diseño artesanal", "Acabado elegante", "Edición limitada"],
    materials: ["Plata 925", "Cristales Swarovski"],
    reviews: [
      "Hermoso diseño, delicado y elegante.",
      "La calidad de la plata es excelente."
    ],
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
    gallery: ["/assets/collar-sol.jpg"],
    description: "Collar radiante inspirado en el sol.",
    features: ["Brillo intenso", "Diseño único"],
    materials: ["Oro amarillo", "Esmalte artístico"],
    reviews: [
      "Brilla muchísimo, ideal para ocasiones especiales.",
      "Un diseño único, vale la pena."
    ],
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
    gallery: ["/assets/pulsera-estrella.jpg"],
    description: "Pulsera ligera inspirada en las estrellas.",
    features: ["Cómoda", "Resistente", "Estilo juvenil"],
    materials: ["Cuero genuino", "Acero inoxidable"],
    reviews: [
      "Cómoda y resistente, perfecta para uso diario.",
      "El diseño es moderno y juvenil."
    ],
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
    gallery: ["/assets/pulsera-aurora.jpg"],
    description: "Pulsera elegante inspirada en la aurora boreal.",
    features: ["Duradera", "Estilo sofisticado"],
    materials: ["Acero inoxidable", "Cristales de colores"],
    reviews: [
      "Muy elegante, combina con todo.",
      "La terminación es impecable."
    ],
    bestseller: false,
    newArrival: true
  }
];

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
          element={<Products products={products} addToCart={addToCart} />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetail products={products} addToCart={addToCart} />}
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