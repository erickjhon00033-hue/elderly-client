import React, { useEffect, useState } from 'react';

function Products({ addToCart }) {
  const [products, setProducts] = useState([]);

  // Cargar productos desde el backend
  useEffect(() => {
    fetch('http://localhost:4000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error al cargar productos:', err));
  }, []);

  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            backgroundColor: '#222',
            padding: '15px',
            borderRadius: '8px',
            width: '250px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.4)'
          }}
        >
          {/* Imagen del producto */}
          <img
            src={product.image_url}
            alt={product.name}
            style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }}
          />

          {/* Nombre */}
          <h3 style={{ color: '#eee', marginBottom: '5px' }}>{product.name}</h3>

          {/* Descripción */}
          <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '10px' }}>
            {product.description}
          </p>

          {/* Precio */}
          <p style={{ color: '#ccc', fontWeight: 'bold', marginBottom: '10px' }}>
            ${product.price_cents / 100}
          </p>

          {/* Botón agregar al carrito */}
          <button
            onClick={() => addToCart(product)}
            style={{
              padding: '10px',
              backgroundColor: '#444',
              color: '#eee',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            🛒 Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;