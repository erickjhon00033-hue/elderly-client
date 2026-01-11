import React from "react";
import { Link } from "react-router-dom";

function Wishlist({ wishlist, toggleWishlist }) {
  return (
    <div className="wishlist">
      <h2>Mis Favoritos 💖</h2>

      {wishlist.length === 0 ? (
        <p>No tienes productos en tu lista de favoritos.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <div key={product.product_id || product.id} className="wishlist-card">
              <div className="image-container">
                <Link to={`/product/${product.product_id || product.id}`}>
                  <img
                    src={product.image_url || product.image}
                    alt={product.name}
                  />
                </Link>
              </div>

              <h3>{product.name}</h3>
              <p>
                Precio: RD$
                {((product.price_cents || product.price * 100) / 100).toFixed(2)}
              </p>
              <p>Material: {product.material}</p>

              <button onClick={() => toggleWishlist(product)}>
                Quitar de favoritos 💔
              </button>
              <Link to={`/product/${product.product_id || product.id}`}>
                <button>Ver detalle</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;