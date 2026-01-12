import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useCart } from "../hooks/useCart";
import { setToken, setUser as setUserLocal } from "../config";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const { cart } = useCart();

  const logout = () => {
    // limpiar token y usuario
    setToken(null);
    setUserLocal(null);
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      {/* Izquierda: logo */}
      <div className="navbar-left">
        <img src="/assets/logo.png" alt="Elderly Logo" className="logo" />
        <h1 className="brand">Elderly</h1>
        <span className="tagline">La elegancia no envejece</span>
      </div>

      {/* Centro: links */}
      <div className="navbar-center">
        <Link to="/collares">Collares</Link>
        <Link to="/pulseras">Pulseras</Link>
        <Link to="/favoritos">Favoritos</Link>
        <Link to="/admin">Admin</Link>
      </div>

      {/* Derecha: usuario + carrito + logout */}
      <div className="navbar-right">
        {user && (
          <span className="user-email">{user.email}</span>
        )}
        <Link to="/cart" className="cart-link">
          🛒 ({cart.length})
        </Link>
        {user && (
          <button onClick={logout} className="logout-btn">
            Cerrar sesión
          </button>
        )}
      </div>
    </nav>
  );
}