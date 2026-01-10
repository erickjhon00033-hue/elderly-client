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
    },
    {
      id: 2,
      name: 'Anillo de Freyja',
      price_cents: 9500,
      img: '/assets/anillo-freyja.jpg',
      description: 'Anillo artesanal que evoca la fuerza y belleza de la diosa nórdica Freyja.',
    },
    {
      id: 3,
      name: 'Pulsera de Hermes',
      price_cents: 8000,
      img: '/assets/pulsera-hermes.jpg',
      description: 'Pulsera ligera inspirada en Hermes, símbolo de movimiento y comunicación.',
    },
    {
      id: 4,
      name: 'Broche de Atenea',
      price_cents: 10500,
      img: '/assets/broche-atenea.jpg',
      description: 'Broche elegante que representa la sabiduría y la estrategia de Atenea.',
    }
  ];

  // Función con animación
  const handleAddToCart = (product, e) => {
    addToCart(product);

    const img = e.target.closest('.product-card').querySelector('img');
    const clone = img.cloneNode(true);
    clone.classList.add('fly-to-cart');
    document.body.appendChild(clone);

    const cartIcon = document.querySelector('.mini-cart');
    if (!cartIcon) return;
    const cartRect = cartIcon.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    clone.style.position = 'fixed';
    clone.style.left = imgRect.left + 'px';
    clone.style.top = imgRect.top + 'px';
    clone.style.width = imgRect.width + 'px';
    clone.style.height = imgRect.height + 'px';
    clone.style.transition = 'all 0.8s ease';

    requestAnimationFrame(() => {
      clone.style.left = cartRect.left + 'px';
      clone.style.top = cartRect.top + 'px';
      clone.style.width = '30px';
      clone.style.height = '30px';
      clone.style.opacity = '0';
    });

    setTimeout(() => clone.remove(), 900);
  };

  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          {/* Imagen con overlay narrativo */}
          <div className="image-container">
            <Link to={`/product/${product.id}`}>
              <img src={product.img} alt={product.name} />
            </Link>
            <Link to={`/product/${product.id}`} className="overlay">
              {product.description}
            </Link>
          </div>

          <h3>{product.name}</h3>
          <p>Precio: ${product.price_cents / 100}</p>
          <button onClick={(e) => handleAddToCart(product, e)}>
            Añadir al carrito
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;