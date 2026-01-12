import { useState, useEffect } from "react";
import { apiFetch, getToken } from "../config";

export function useWishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Al montar, carga la wishlist del backend o localStorage si no hay login
  useEffect(() => {
    async function fetchWishlist() {
      try {
        const token = getToken();
        if (!token) {
          // Invitado → cargar desde localStorage
          const saved = localStorage.getItem("wishlist");
          setWishlist(saved ? JSON.parse(saved) : []);
          setLoading(false);
          return;
        }

        // Usuario logueado → cargar desde backend
        const res = await apiFetch("/api/wishlist");
        setWishlist(res.data || []);
      } catch (err) {
        console.error("Error al cargar wishlist:", err);
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    }

    fetchWishlist();
  }, []);

  // Guardar en localStorage si no hay login
  function saveLocalWishlist(newWishlist) {
    setWishlist(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
  }

  // Alternar producto en wishlist (añadir/quitar)
  async function toggleWishlist(product) {
    const token = getToken();
    if (!token) {
      // Invitado → manejar en localStorage
      const exists = wishlist.find((item) => item.id === product.id);
      if (exists) {
        saveLocalWishlist(wishlist.filter((item) => item.id !== product.id));
      } else {
        saveLocalWishlist([...wishlist, product]);
      }
      return;
    }

    // Usuario logueado → backend
    const res = await apiFetch("/api/wishlist/toggle", {
      method: "POST",
      body: JSON.stringify({ product_id: product.id || product.product_id }),
    });

    // El backend devuelve { success, action, wishlistId? }
    if (res.success) {
      // Recargar wishlist desde backend
      const updated = await apiFetch("/api/wishlist");
      setWishlist(updated.data || []);
    }
  }

  // Eliminar producto de la wishlist
  async function removeFromWishlist(productId) {
    const token = getToken();
    if (!token) {
      saveLocalWishlist(wishlist.filter((item) => item.id !== productId));
      return;
    }

    await apiFetch(`/api/wishlist/${productId}`, { method: "DELETE" });
    const updated = await apiFetch("/api/wishlist");
    setWishlist(updated.data || []);
  }

  // Vaciar wishlist
  async function clearWishlist() {
    const token = getToken();
    if (!token) {
      saveLocalWishlist([]);
      return;
    }

    // No tenemos /clear en backend, así que eliminamos todos manualmente
    for (const item of wishlist) {
      await apiFetch(`/api/wishlist/${item.id}`, { method: "DELETE" });
    }
    setWishlist([]);
  }

  // 🔄 Sincronizar wishlist local con backend al login
  async function syncWishlist() {
    const token = getToken();
    if (token && wishlist.length > 0) {
      await apiFetch("/api/wishlist/sync", {
        method: "POST",
        body: JSON.stringify({
          items: wishlist.map((item) => ({ product_id: item.id })),
        }),
      });
      localStorage.removeItem("wishlist"); // limpiar localStorage
      const updated = await apiFetch("/api/wishlist");
      setWishlist(updated.data || []);
    }
  }

  return {
    wishlist,
    loading,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,
    syncWishlist,
  };
}