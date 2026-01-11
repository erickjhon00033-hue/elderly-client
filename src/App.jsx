import React, { useContext, useState } from "react";
import logo from "./assets/Logo.png";
import Products from "./Products";
import Cart from "./Cart";
import Checkout from "./Checkout";
import ProductDetail from "./ProductDetail";
import Categories from "./Categories";
import Wishlist from "./Wishlist";
import Login from "./Login";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import { UserContext } from "./UserContext";

// 👉 Hooks conectados al backend
import { useAuth } from "./hooks/useAuth";
import { useCart } from "./hooks/useCart";
import { useWishlist } from "./hooks/useWishlist";
import { useProducts } from "./hooks/useProducts";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [searchTerm, setSearchTerm] = useState("");

  // 🔑 Autenticación
  const { user, login, logout } = useAuth();

  // 🛒 Carrito
  const { cart, loading: cartLoading, addToCart } = useCart();

  // ❤️ Wishlist
  const { wishlist, loading: wishlistLoading, toggleWishlist } = useWishlist();

  // 📦 Productos
  const { products, loading: productsLoading } = useProducts();

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

        {/* Navegación */}
        <nav className="header-nav header-nav--right">
          <Link to="/">Inicio</Link>
          <Link to="/collares">Collares</Link>
          <Link to="/pulseras">Pulseras</Link>
          <Link to="/wishlist">Favoritos</Link>

          {user ? (
            <>
              <span className="user-info">👤 {user.email}</span>
              <button onClick={logout} className="logout-button">
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link to="/login">Login / Registro</Link>
          )}

          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="mini-cart">
            <Link to="/cart">
              🛒 (
              {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)})
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
              {productsLoading ? (
                <p>Cargando productos...</p>
              ) : (
                <Products
                  products={products}
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  wishlist={wishlist}
                  searchTerm={searchTerm}
                />
              )}
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
            cartLoading ? (
              <p>Cargando carrito...</p>
            ) : (
              <Cart cart={cart} clearCart={() => {}} />
            )
          }
        />

        <Route
          path="/checkout"
          element={<Checkout cart={cart} clearCart={() => {}} />}
        />

        <Route
          path="/wishlist"
          element={
            wishlistLoading ? (
              <p>Cargando favoritos...</p>
            ) : (
              <Wishlist wishlist={wishlist} toggleWishlist={toggleWishlist} />
            )
          }
        />

        <Route path="/login" element={<Login login={login} />} />
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