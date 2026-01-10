import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <img src="/assets/logo.png" alt="Elderly Logo" className="logo" />
      <h1>Elderly</h1>
      <div>
        <Link to="/collares">Collares</Link>
        <Link to="/pulseras">Pulseras</Link>
        <Link to="/cart">Carrito</Link>
      </div>
    </nav>
  );
}