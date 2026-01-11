import { useState, useEffect } from "react";
import { apiFetch } from "../config";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar productos al montar
  useEffect(() => {
    fetchProducts();
  }, []);

  // Función reutilizable para cargar productos
  async function fetchProducts() {
    try {
      setLoading(true);
      setError(null);

      const data = await apiFetch("/api/products");
      setProducts(data);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  return { products, loading, error, refetch: fetchProducts };
}