import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

// Fallback local (solo si no llegan productos del backend)
export const productsFallback = [
  {
    id: 1,
    category: "collares",
    name: "Collar de Plata",
    description: "Collar elegante hecho a mano.",
    price_cents: 250000, // centavos
    stock: 10,
    material: "Plata",
    image_url: "/images/collar1.jpg",
    gallery: [
      "/images/collar1.jpg",
      "/images/collar1_detalle.jpg",
      "/images/collar1_modelo.jpg",
    ],
    features: ["Hecho a mano", "Diseño exclusivo", "Acabado brillante"],
    materials: ["Plata 925", "Cadena ajustable"],
    bestseller: true,
  },
  {
    id: 2,
    category: "pulseras",
    name: "Pulsera de Cuero",
    description: "Pulsera artesanal con detalles metálicos.",
    price_cents: 180000,
    stock: 5,
    material: "Cuero",
    image_url: "/images/pulsera1.jpg",
    gallery: ["/images/pulsera1.jpg", "/images/pulsera1_detalle.jpg"],
    features: ["Ajustable", "Duradero", "Diseño unisex"],
    materials: ["Cuero genuino", "Acero inoxidable"],
    newArrival: true,
  },
];

function Products({
  products: productsProp,
  addToCart,
  toggleWishlist,
  wishlist,
  searchTerm,
}) {
  const { category } = useParams();

  // Usa productos de props (backend) o fallback local
  const listSource =
    Array.isArray(productsProp) && productsProp.length > 0
      ? productsProp
      : productsFallback;

  // Estados de filtros
  const [materialFilter, setMaterialFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState(0); // RD$ entero (ej: 1500)
  const [stockFilter, setStockFilter] = useState(false);
  const [sortOption, setSortOption] = useState("");

  // Helpers de precio
  const getPriceCents = (p) =>
    typeof p.price_cents === "number"
      ? p.price_cents
      : Math.round((p.price || 0) * 100);

  const getPriceDisplay = (p) => (getPriceCents(p) / 100).toFixed(2);

  // Filtro, orden y búsqueda
  const applyFilters = (list) => {
    let filtered = list
      .filter((p) =>
        searchTerm
          ? p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.description || "")
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          : true
      )
      .filter((p) =>
        materialFilter
          ? (p.material || "").toLowerCase() === materialFilter.toLowerCase()
          : true
      )
      .filter((p) =>
        priceFilter > 0 ? getPriceCents(p) <= priceFilter * 100 : true
      )
      .filter((p) => (stockFilter ? (p.stock || 0) > 0 : true));

    if (sortOption === "priceAsc") {
      filtered = [...filtered].sort(
        (a, b) => getPriceCents(a) - getPriceCents(b)
      );
    } else if (sortOption === "priceDesc") {
      filtered = [...filtered].sort(
        (a, b) => getPriceCents(b) - getPriceCents(a)
      );
    } else if (sortOption === "bestseller") {
      filtered = [...filtered].sort((a, b) => (b.bestseller ? 1 : -1));
    } else if (sortOption === "newArrival") {
      filtered = [...filtered].sort((a, b) => (b.newArrival ? 1 : -1));
    }

    return filtered;
  };

  // Animación: volar imagen al carrito
  const handleAddToCart = (product, e) => {
    addToCart(product);

    const card = e.target.closest(".product-card");
    if (!card) return;
    const img = card.querySelector("img");
    if (!img) return;

    const clone = img.cloneNode(true);
    clone.classList.add("fly-to-cart");
    document.body.appendChild(clone);

    const cartIcon = document.querySelector(".mini-cart");
    if (!cartIcon) return;

    const cartRect = cartIcon.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    Object.assign(clone.style, {
      position: "fixed",
      left: imgRect.left + "px",
      top: imgRect.top + "px",
      width: imgRect.width + "px",
      height: imgRect.height + "px",
      transition: "all 0.8s ease",
      zIndex: 9999,
    });

    requestAnimationFrame(() => {
      Object.assign(clone.style, {
        left: cartRect.left + "px",
        top: cartRect.top + "px",
        width: "30px",
        height: "30px",
        opacity: "0",
      });
    });

    setTimeout(() => clone.remove(), 900);
  };

  // Animación: corazón flotante al añadir a favoritos
  const showHeartEffect = (e) => {
    const heart = document.createElement("div");
    heart.className = "heart-float";
    heart.textContent = "💖";

    const rect = e.target.getBoundingClientRect();
    Object.assign(heart.style, {
      position: "fixed",
      left: rect.left + rect.width / 2 + "px",
      top: rect.top + "px",
      fontSize: "20px",
      animation: "floatUp 1s ease-out",
      zIndex: 9999,
    });

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  };

  // Renderizado de una lista
  const renderProducts = (list) => {
    const filtered = applyFilters(list);

    if (filtered.length === 0) {
      return <p>No hay productos que coincidan con tu búsqueda/filtros</p>;
    }

    return (
      <>
        {priceFilter > 0 && (
          <p className="price-message">
            Mostrando {filtered.length} producto
            {filtered.length !== 1 ? "s" : ""} hasta RD${priceFilter}
          </p>
        )}

        <div className="products-grid">
          {filtered.map((product) => {
            const isFavorite = wishlist.some(
              (item) =>
                item.product_id === product.id || item.id === product.id
            );

            return (
              <div key={product.id} className="product-card">
                <div className="image-container">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image_url || product.image}
                      alt={product.name}
                    />
                  </Link>
                  <Link to={`/product/${product.id}`} className="overlay">
                    {product.description}
                  </Link>
                </div>

                <h3>{product.name}</h3>
                <p>Precio: RD${getPriceDisplay(product)}</p>
                <p>Material: {product.material}</p>
                <p>Stock: {product.stock}</p>

                {product.bestseller && (
                  <span className="badge bestseller">Más vendido</span>
                )}
                {product.newArrival && <span className="badge new">Nuevo</span>}

                {/* Botón dorado para carrito */}
                <button className="pay-button" onClick={(e) => handleAddToCart(product, e)}>
                  Añadir al carrito
                </button>

                {/* Botón dorado para favoritos con corazón dinámico */}
                <button
                  onClick={(e) => {
                    toggleWishlist(product);
                    showHeartEffect(e);
                  }}
                  className="pay-button wishlist-button"
                >
                  <span className={isFavorite ? "heart red" : "heart white"}>
                    ♥
                  </span>
                  {isFavorite ? " Quitar de favoritos" : " Añadir a favoritos"}
                </button>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div>
      {/* Filtros */}
      <div className="filters">
        <select onChange={(e) => setMaterialFilter(e.target.value)}>
          <option value="">Todos los materiales</option>
          <option value="Plata">Plata</option>
          <option value="Oro">Oro</option>
          <option value="Cuero">Cuero</option>
          <option value="Acero inoxidable">Acero inoxidable</option>
        </select>

        <label>
          Precio máximo:
          <input
            type="number"
            list="priceSuggestions"
            value={priceFilter}
            onChange={(e) => setPriceFilter(parseInt(e.target.value) || 0)}
            placeholder="Ej: 1500"
            min="500"
            max="10000"
            step="100"
          />
          <datalist id="priceSuggestions">
            <option value="500" />
            <option value="1000" />
            <option value="1500" />
            <option value="2000" />
            <option value="2500" />
            <option value="3000" />
            <option value="4000" />
            <option value="5000" />
            <option value="7500" />
            <option value="10000" />
          </datalist>
        </label>

        <label>
          <input
            type="checkbox"
            checked={stockFilter}
            onChange={(e) => setStockFilter(e.target.checked)}
          />
          Solo en stock
        </label>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Ordenar por...</option>
          <option value="priceAsc">Precio: menor a mayor</option>
          <option value="priceDesc">Precio: mayor a menor</option>
          <option value="bestseller">Más vendidos</option>
          <option value="newArrival">Novedades</option>
        </select>

        <button
          onClick={() => {
            setMaterialFilter("");
            setPriceFilter(0);
            setStockFilter(false);
            setSortOption("");
          }}
        >
          Limpiar filtros
        </button>
      </div>

      {/* Mostrar productos */}
      {category ? (
        renderProducts(listSource.filter((p) => p.category === category))
      ) : (
        <>
          <h2>Collares</h2>
          {renderProducts(listSource.filter((p) => p.category === "collares"))}

          <h2>Pulseras</h2>
          {renderProducts(listSource.filter((p) => p.category === "pulseras"))}
        </>
      )}
    </div>
  );
}

export default Products;