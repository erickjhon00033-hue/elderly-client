import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail({ products, addToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);

  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div className="product-detail">
      <img src={product.img} alt={product.name} />
      <h2>{product.name}</h2>
      <p className="price">Precio: ${product.price_cents / 100}</p>

      {/* Opciones desplegables */}
      <details>
        <summary>Descripción</summary>
        <p>{product.description}</p>
      </details>

      <details>
        <summary>Características</summary>
        <ul>
          {product.features?.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
      </details>

      <details>
        <summary>Materiales</summary>
        <ul>
          {product.materials?.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
      </details>

      {/* Cantidad y stock */}
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
        <p>Stock disponible: {product.stock}</p>
      </div>

      <button onClick={() => addToCart({ ...product, quantity })}>
        Añadir al carrito
      </button>
    </div>
  );
}

export default ProductDetail;