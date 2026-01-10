import React, { useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail({ products, addToCart, toggleWishlist, wishlist }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  const [selectedImage, setSelectedImage] = useState(
    product.gallery && product.gallery.length > 0 ? product.gallery[0] : product.image
  );
  const [quantity, setQuantity] = useState(1);

  // Animación al añadir al carrito
  const handleAddToCart = (e) => {
    addToCart({ ...product, quantity });

    const img = e.target.closest(".product-detail").querySelector(".detail-image");
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
    <div className="product-detail">
      {/* Imagen principal */}
      <img src={selectedImage} alt={product.name} className="detail-image" />

      {/* Galería */}
      {product.gallery && product.gallery.length > 1 && (
        <div className="gallery">
          {product.gallery.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.name} ${index}`}
              className="thumb"
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      )}

      {/* Información */}
      <h2>{product.name}</h2>
      <p className="price">Precio: RD${product.price.toFixed(2)}</p>
      <p>{product.description}</p>

      {/* Secciones expandibles */}
      {product.features && product.features.length > 0 && (
        <details>
          <summary>Características</summary>
          <ul>
            {product.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </details>
      )}

      {product.materials && product.materials.length > 0 && (
        <details>
          <summary>Materiales</summary>
          <ul>
            {product.materials.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </details>
      )}

      <p>Stock disponible: {product.stock}</p>

      {/* Selección de cantidad */}
      <div className="order-section">
        <label>
          Cantidad:
          <input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </label>
      </div>

      {/* Botones */}
      <button onClick={handleAddToCart}>Añadir al carrito</button>
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
  );
}

export default ProductDetail;