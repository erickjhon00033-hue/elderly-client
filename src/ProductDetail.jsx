import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productsFallback } from "./Products"; // ✅ fallback local

function ProductDetail({ products, addToCart, toggleWishlist, wishlist, user }) {
  const { id } = useParams();

  // Usa productos de props (backend) o fallback local
  const listSource =
    Array.isArray(products) && products.length > 0 ? products : productsFallback;

  const product = listSource.find((p) => p.id === parseInt(id));

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  const [selectedImage, setSelectedImage] = useState(
    product.gallery && product.gallery.length > 0
      ? product.gallery[0]
      : product.image_url || product.image
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  // 🔥 reseñas desde backend
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [reviewError, setReviewError] = useState(""); // mensaje de error

  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [materialsOpen, setMaterialsOpen] = useState(false);

  // Cargar reseñas al montar
  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE}/api/reviews/${product.id}`
        );
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Error cargando reseñas:", err);
      }
    }
    loadReviews();
  }, [product.id]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity, size: selectedSize });
  };

  // Enviar reseña al backend
  const handleAddReview = async () => {
    if (newReview.rating > 0 && newReview.comment.trim() !== "") {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE}/api/reviews/${product.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`, // token del login
            },
            body: JSON.stringify(newReview),
          }
        );
        const data = await res.json();

        if (res.status === 403) {
          setReviewError(data.message); // mensaje del backend
          return;
        }

        if (data.success) {
          setReviews(data.reviews);
          setNewReview({ rating: 0, comment: "" });
          setReviewError(""); // limpiar error si todo salió bien
        } else {
          setReviewError(data.message || "Error enviando reseña");
        }
      } catch (err) {
        console.error("Error enviando reseña:", err);
        setReviewError("Error de conexión con el servidor");
      }
    }
  };

  const renderStars = (rating) =>
    "⭐".repeat(rating) + "☆".repeat(5 - rating);

  // Helper para mostrar precio
  const getPriceDisplay = (p) =>
    ((p.price_cents || p.price * 100) / 100).toFixed(2);

  const isFavorite = wishlist.some(
    (item) => item.product_id === product.id || item.id === product.id
  );

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
      <p className="price">Precio: RD${getPriceDisplay(product)}</p>
      <p>{product.description}</p>

      {/* Caja de tallas */}
      <label>
        Talla:
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="">Selecciona una talla</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </label>

      {/* Accordion de características */}
      <div className={`accordion ${featuresOpen ? "open" : ""}`}>
        <div
          className="accordion-header"
          onClick={() => setFeaturesOpen(!featuresOpen)}
        >
          {featuresOpen ? "➖ Características" : "➕ Características"}
        </div>
        <div className="accordion-content">
          {product.features && product.features.length > 0 ? (
            <ul>
              {product.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          ) : (
            <p>No hay características registradas.</p>
          )}
        </div>
      </div>

      {/* Accordion de materiales */}
      <div className={`accordion ${materialsOpen ? "open" : ""}`}>
        <div
          className="accordion-header"
          onClick={() => setMaterialsOpen(!materialsOpen)}
        >
          {materialsOpen ? "➖ Materiales" : "➕ Materiales"}
        </div>
        <div className="accordion-content">
          {product.materials && product.materials.length > 0 ? (
            <ul>
              {product.materials.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          ) : (
            <p>No hay materiales registrados.</p>
          )}
        </div>
      </div>

      <p>Stock disponible: {product.stock}</p>

      {/* Cantidad */}
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

      {/* Botones dorados */}
      <button className="pay-button" onClick={handleAddToCart}>
        Añadir al carrito
      </button>

      <button
        className="pay-button wishlist-button"
        onClick={() => toggleWishlist(product)}
      >
        <span className={isFavorite ? "heart red" : "heart white"}>♥</span>
        {isFavorite ? " Quitar de favoritos" : " Añadir a favoritos"}
      </button>

      {/* Reseñas */}
      <div
        style={{
          marginTop: "300px",
          borderTop: "1px solid #ddd",
          paddingTop: "180px",
          textAlign: "left",
          maxWidth: "600px",
        }}
      >
        <div className="reviews">
          <h3>Opiniones de clientes</h3>
          {reviews.map((r, i) => (
            <div key={i} className="review">
              <strong>{r.user_email || r.user}</strong> — {renderStars(r.rating)}
              <p>{r.comment}</p>
            </div>
          ))}

          <h4>Deja tu reseña</h4>
          <select
            value={newReview.rating}
            onChange={(e) =>
              setNewReview({
                ...newReview,
                rating: parseInt(e.target.value),
              })
            }
          >
            <option value="0">Selecciona estrellas</option>
            <option value="1">⭐</option>
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
          </select>
          <textarea
            placeholder="Escribe tu comentario..."
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
          />
          <button className="pay-button" onClick={handleAddReview}>
            Enviar reseña
          </button>

          {/* Mensaje de error */}
          {reviewError && (
            <p style={{ color: "red", marginTop: "10px" }}>{reviewError}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;