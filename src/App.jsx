import React, { useState } from 'react';
import logo from './assets/Logo.png';
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

  // Catálogo ficticio (luego reemplazas con productos reales o API)
  const products = [
    {
      id: 1,
      name: 'Collar de Arianrhod',
      price_cents: 12000,
      img: '/assets/collar-arianrhod.jpg',
      description: 'Un delicado collar inspirado en la diosa celta de la luna y las estrellas.',
      features: ['Diseño artesanal', 'Acabado elegante', 'Edición limitada'],
      materials: ['Plata 925', 'Cristales Swarovski'],
      stock: 10,
      gallery: [
        '/assets/collar-arianrhod.jpg',
        '/assets/collar-arianrhod2.jpg',
        '/assets/collar-arianrhod3.jpg'
      ]
    },
    {
      id: 2,
      name: 'Anillo de Freyja',
      price_cents: 9500,
      img: '/assets/anillo-freyja.jpg',
      description: 'Anillo artesanal que evoca la fuerza y belleza de la diosa nórdica Freyja.',
      features: ['Resistente al desgaste', 'Diseño único'],
      materials: ['Oro rosa', 'Cuarzo rosa'],
      stock: 5,
      gallery: ['/assets/anillo-freyja.jpg']
    },
    {
      id: 3,
      name: 'Pulsera de Hermes',
      price_cents: 8000,
      img: '/assets/pulsera-hermes.jpg',
      description: 'Pulsera ligera inspirada en Hermes, símbolo de movimiento y comunicación.',
      features: ['Ajustable', 'Estilo minimalista'],
      materials: ['Cuero genuino', 'Acero inoxidable'],
      stock: 8,
      gallery: ['/assets/pulsera-hermes.jpg']
    },
    {
      id: 4,
      name: 'Broche de Atenea',
      price_cents: 10500,
      img: '/assets/broche-atenea.jpg',
      description: 'Broche elegante que representa la sabiduría y la estrategia de Atenea.',
      features: ['Diseño clásico', 'Ideal para ocasiones formales'],
      materials: ['Bronce pulido', 'Esmalte artístico'],
      stock: 12,
      gallery: ['/assets/broche-atenea.jpg']
    }
  ];

  // Lógica de carrito
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

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price_cents * item.quantity, 0) / 100;
  };

  return (
    <div className="app">
      {/* Header */}
      <header className={isHome ? 'header header--home' : 'header'}>
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
          <div className="mini-cart">
            <Link to="/cart">🛒 ({cart.length})</Link>
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

      {/* Footer completo */}
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
        <small>© {new Date().getFullYear()} Elderly — La elegancia no envejece</small>
      </footer>
    </div>
  );
}

export default App;