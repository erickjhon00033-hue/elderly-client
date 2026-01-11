import { useState, useEffect } from "react";
import { apiFetch, getToken } from "../config";

export function useWishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Al montar, carga la wishlist del backend
  useEffect(() => {
    async function fetchWishlist() {
      try {
        const token = getToken();
        if (!token) {
          setWishlist([]);
          setLoading(false);
          return;
        }

        const data = await apiFetch("/api/wishlist");
        setWishlist(data);
      } catch (err) {
        console.error("Error al cargar wishlist:", err);
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    }

    fetchWishlist();
  }, []);

  // Alternar producto en wishlist (añadir/quitar)
  async function toggleWishlist(product) {
    const token = getToken();
    if (!token) throw new Error("Usuario no autenticado");

    const data = await apiFetch("/api/wishlist/toggle", {
      method: "POST",
      body: JSON.stringify({ product_id: product.id || product.product_id }),
    });
    setWishlist(data);
  }

  // Eliminar producto de la wishlist
  async function removeFromWishlist(productId) {
    const token = getToken();
    if (!token) throw new Error("Usuario no autenticado");

    const data = await apiFetch(`/api/wishlist/${productId}`, {
      method: "DELETE",
    });
    setWishlist(data);
  }

  // Vaciar wishlist
  async function clearWishlist() {
    const token = getToken();
    if (!token) throw new Error("Usuario no autenticado");

    const data = await apiFetch("/api/wishlist/clear", {
      method: "POST",
    });
    setWishlist(data);
  }

  return { wishlist, loading, toggleWishlist, removeFromWishlist, clearWishlist };
}