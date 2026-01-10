import React from 'react';

function Products({ addToCart }) {
  const products = [
    {
      id: 1,
      name: 'Collar de Arianrhod',
      price_cents: 12000,
      img: '/assets/collar-arianrhod.jpg',
      description: 'Un delicado collar inspirado en la diosa celta de la luna y las estrellas.'
    },
    {
      id: 2,
      name: 'Anillo de Freyja',
      price_cents: 9500,
      img: '/assets/anillo-freyja.jpg',
      description: 'Anillo artesanal que evoca la fuerza y belleza de la diosa nórdica Freyja.'
    },
    {
      id: 3,
      name: 'Pulsera de Hermes',
      price_cents: 8000,
      img: '/assets/pulsera-hermes.jpg',
      description: 'Pulsera ligera inspirada en Hermes, símbolo de movimiento y comunicación.'
    },
    {
      id: 4,
      name: 'Broche de Atenea',
      price_cents: 10500,
      img: '/assets/broche-atenea.jpg',
      description: 'Broche elegante que representa la sabiduría y la estrategia de Atenea.'
    }
  ];

  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.img} alt={product.name} />
          <h3>{product.name}</h3>
          <p>Precio: ${product.price_cents / 100}</p>
          <button onClick={() => addToCart(product)}>Añadir al carrito</button>

          {/* Overlay narrativo */}
          <div className="overlay">
            {product.description}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;