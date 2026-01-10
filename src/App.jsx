import React, { useState } from 'react';
import logo from './assets/Logo.png'; // asegúrate que el archivo esté en minúsculas
import Products from './products';
import Cart from './Cart';
import Checkout from './Checkout';
import ProductDetail from './ProductDetail';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Lista de productos compartida con ProductDetail
  const products = [
    {
      id: 1,
      name: 'Collar de Arianrhod',
      price_cents: 12000,
      img: '/assets/collar-arianrhod.jpg',
      description: 'Un delicado collar inspirado en la diosa celta de la luna y las estrellas.',
      features: ['Diseño artesanal', 'Acabado elegante', 'Edición limitada'],
      materials: ['Plata 925', 'Cristales Swarovski'],
      stock: 10
    },
    {
      id: 2,
      name: 'Anillo de Freyja',
      price_cents: 9500,
      img: '/assets/anillo-freyja.jpg',
      description: 'Anillo artesanal que evoca la fuerza y belleza de la diosa nórdica Freyja.',
      features: ['Resistente al desgaste', 'Diseño único'],
      materials: ['Oro rosa', 'Cuarzo rosa'],
      stock: 5
    },
    {
      id: 3,
      name: 'Pulsera de Hermes',
      price_cents: 8000,
      img: '/assets/pulsera-hermes.jpg',
      description: 'Pulsera ligera inspirada en Hermes, símbolo de movimiento y comunicación.',
      features: ['Ajustable', 'Estilo minimalista'],
      materials: ['Cuero genuino', 'Acero inoxidable'],
      stock: 8
    },
    {
      id: 4,
      name: 'Broche de Atenea',
      price_cents: 10500,
      img: '/assets/broche-atenea.jpg',
      description: 'Broche elegante que representa la sabiduría y la estrategia de Atenea.',
      features: ['Diseño clásico', 'Ideal para ocasiones formales'],
      materials: ['Bronce pulido', 'Esmalte artístico'],
      stock: 12
    }
  ];

  // Agregar producto al carrito
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
        <Route
          path="/product/:id"
          element={
            <ProductDetail
              products={products}
              addToCart={addToCart}
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