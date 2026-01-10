import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

function Products({ products, addToCart, toggleWishlist, wishlist, searchTerm }) {
  const { category } = useParams();

  // Estados de filtros
  const [materialFilter, setMaterialFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState(0);
  const [stockFilter, setStockFilter] = useState(false);

  // Filtrado general
  const filteredProducts = products
    .filter((p) => (category ? p.category === category : true))
    .filter((p) =>
      searchTerm
        ? p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    )
    .filter((p) =>
      materialFilter ? p.material.toLowerCase() === materialFilter.toLowerCase() : true
    )
    .filter((p) => (priceFilter > 0 ? p.price <= priceFilter : true))
    .filter((p) => (stockFilter ? p.stock > 0 : true));

  // Animación al añadir al carrito
  const handleAddToCart = (product, e) => {
    addToCart(product);

    const img = e.target.closest(".product-card").querySelector("img");
    const clone = img.cloneNode(true);
    clone.classList.add("fly-to-cart");
    document.body.appendChild(clone);

    const cartIcon = document.querySelector(".mini-cart");
    if (!cartIcon) return;
    const cartRect = cartIcon.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    clone.style.position = "fixed";
    clone.style.left = imgRect.left + "px";
    clone.style.top = imgRect.top + "px";
    clone.style.width = imgRect.width + "px";
    clone.style.height = imgRect.height + "px";
    clone.style.transition = "all 0.8s ease";

    requestAnimationFrame(() => {
      clone.style.left = cartRect.left + "px";
      clone.style.top = cartRect.top + "px";
      clone.style.width = "30px";
      clone.style.height = "30px";
      clone.style.opacity = "0";
    });

    setTimeout(() => clone.remove(), 900);
  };

  // Animación de corazones al añadir a favoritos
  const showHeartEffect = (e) => {
    const heart = document.createElement("div");
    heart.className = "heart-float";
    heart.textContent = "💖";

    const rect = e.target.getBoundingClientRect();
    heart.style.left = rect.left + rect.width / 2 + "px";
    heart.style.top = rect.top + "px";

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  };

  return (
    <div>
      {/* Filtros */}
      <div className="filters">
        <select onChange={(e) => setMaterialFilter(e.target.value)}>
          <option value="">Todos los materiales</option>
          <option value="Plata">Plata</option>
          <option value="Oro">Oro</option>
          <option value="Cuero">Cuero</option>
          <option value="Acero inoxidable">Acero inoxidable</option>
        </select>

        <select onChange={(e) => setPriceFilter(parseInt(e.target.value))}>
          <option value="0">Todos los precios</option>
          <option value="5000">Menor a RD$5,000</option>
          <option value="10000">Menor a RD$10,000</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={stockFilter}
            onChange={(e) => setStockFilter(e.target.checked)}
          />
          Solo en stock
        </label>
      </div>

      {/* Grid de productos */}
      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <p>No hay productos que coincidan con tu búsqueda/filtros</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="image-container">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
                <Link to={`/product/${product.id}`} className="overlay">
                  {product.description}
                </Link>
              </div>

              <h3>{product.name}</h3>
              <p>Precio: RD${product.price}</p>
              <p>Material: {product.material}</p>
              <p>Stock: {product.stock}</p>

              {/* Badges */}
              {product.bestseller && (
                <span className="badge bestseller">Más vendido</span>
              )}
              {product.newArrival && <span className="badge new">Nuevo</span>}

              {/* Botones */}
              <button onClick={(e) => handleAddToCart(product, e)}>
                Añadir al carrito
              </button>
              <button
                onClick={(e) => {
                  toggleWishlist(product);
                  showHeartEffect(e);
                }}
              >
                {wishlist.find((item) => item.id === product.id)
                  ? "💖 Quitar de favoritos"
                  : "🤍 Añadir a favoritos"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;