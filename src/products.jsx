import React from 'react';
import { Link } from 'react-router-dom';

function Products({ addToCart }) {
  const products = [
    {
      id: 1,
      name: 'Collar de Arianrhod',
      price_cents: 12000,
      img: '/assets/collar-arianrhod.jpg',
      description: 'Un delicado collar inspirado en la diosa celta de la luna y las estrellas.',
      features: ['Diseño artesanal', 'Acabado elegante', 'Edición limitada'],
      materials: ['Plata 925', 'Cristales Swarovski'],
      stock: 10
    },
    {
      id: 2,
      name: 'Anillo de Freyja',
      price_cents: 9500,
      img: '/assets/anillo-freyja.jpg',
      description: 'Anillo artesanal que evoca la fuerza y belleza de la diosa nórdica Freyja.',
      features: ['Resistente al desgaste', 'Diseño único'],
      materials: ['Oro rosa', 'Cuarzo rosa'],
      stock: 5
    },
    {
      id: 3,
      name: 'Pulsera de Hermes',
      price_cents: 8000,
      img: '/assets/pulsera-hermes.jpg',
      description: 'Pulsera ligera inspirada en Hermes, símbolo de movimiento y comunicación.',
      features: ['Ajustable', 'Estilo minimalista'],
      materials: ['Cuero genuino', 'Acero inoxidable'],
      stock: 8
    },
    {
      id: 4,
      name: 'Broche de Atenea',
      price_cents: 10500,
      img: '/assets/broche-atenea.jpg',
      description: 'Broche elegante que representa la sabiduría y la estrategia de Atenea.',
      features: ['Diseño clásico', 'Ideal para ocasiones formales'],
      materials: ['Bronce pulido', 'Esmalte artístico'],
      stock: 12
    }
  ];

  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          {/* Enlace a la página de detalle */}
          <Link to={`/product/${product.id}`}>
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
          </Link>

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