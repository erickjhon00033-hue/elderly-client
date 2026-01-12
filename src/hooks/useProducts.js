import { useState, useEffect } from "react";
import { apiFetch } from "../config";

export function useProducts(refreshTrigger) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar productos al montar y cuando cambie refreshTrigger
  useEffect(() => {
    fetchProducts();
  }, [refreshTrigger]);

  // Función reutilizable para cargar productos
  async function fetchProducts() {
    try {
      setLoading(true);
      setError(null);

      const response = await apiFetch("/api/products");

      // 👇 validar que response.data sea un array
      if (response && response.success && Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setProducts([]);
        setError("No se pudieron cargar los productos");
      }
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError(err.message || "Error desconocido");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  return { products, loading, error, refetch: fetchProducts };
}