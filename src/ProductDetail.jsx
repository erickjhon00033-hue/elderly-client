import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "./products"; // Importamos los datos

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  // Si no existe el producto
  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  // Estado para galería y cantidad
  const [selectedImage, setSelectedImage] = useState(
    product.gallery ? product.gallery[0] : product.image
  );
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e) => {
    addToCart({ ...product, quantity });

    // Animación de volar al carrito
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

  return (
    <div className="product-detail">
      {/* Imagen principal */}
      <img src={selectedImage} alt={product.name} className="detail-image" />

      {/* Galería de imágenes */}
      {product.gallery && (
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

      {/* Información del producto */}
      <h2>{product.name}</h2>
      <p className="price">Precio: RD${product.price}</p>
      <p>{product.description}</p>

      {/* Secciones expandibles */}
      {product.features && (
        <details>
          <summary>Características</summary>
          <ul>
            {product.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </details>
      )}

      {product.materials && (
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

      {/* Botón de acción */}
      <button onClick={handleAddToCart}>Añadir al carrito</button>
    </div>
  );
}

export default ProductDetail;