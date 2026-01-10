import React from "react";
import { Link, useParams } from "react-router-dom";

function Products({ products, addToCart }) {
  const { category } = useParams(); // obtenemos la categoría desde la URL

  // Filtramos productos según la categoría
  const filteredProducts = category
    ? products.filter((p) => p.category === category)
    : products;

  const handleAddToCart = (product, e) => {
    addToCart(product);

    // Animación de volar al carrito
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

  return (
    <div className="products-grid">
      {filteredProducts.length === 0 ? (
        <p>No hay productos en esta categoría</p>
      ) : (
        filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            {/* Imagen con overlay narrativo */}
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

            {/* Badges de marketing */}
            {product.bestseller && (
              <span className="badge bestseller">Más vendido</span>
            )}
            {product.newArrival && <span className="badge new">Nuevo</span>}

            <button onClick={(e) => handleAddToCart(product, e)}>
              Añadir al carrito
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Products;