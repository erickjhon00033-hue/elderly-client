import React from "react";
import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <div className="categories">
      <h2>Categorías</h2>
      <div className="category-list">
        <Link to="/collares" className="category-card">
          <h3>Collares</h3>
          <p>Explora nuestra colección de collares artesanales.</p>
        </Link>

        <Link to="/pulseras" className="category-card">
          <h3>Pulseras</h3>
          <p>Descubre nuestras pulseras únicas y elegantes.</p>
        </Link>
      </div>
    </div>
  );
}