import { useState, useEffect } from "react";
import { apiFetch, getToken } from "../config";

export function useCart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔧 Helper para normalizar la respuesta del backend
  function normalizeCartResponse(data) {
    console.log("Respuesta backend carrito:", data);

    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.cart)) return data.cart;
    if (data && Array.isArray(data.items)) return data.items;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
  }

  // 📦 Al montar, carga carrito: si hay token → backend, si no → localStorage
  useEffect(() => {
    async function fetchCart() {
      try {
        const token = getToken();
        if (!token) {
          const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
          setCart(localCart);
          setLoading(false);
          return;
        }

        const data = await apiFetch("/api/cart");
        setCart(normalizeCartResponse(data));
      } catch (err) {
        console.error("Error al cargar carrito:", err);
        setCart([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

  // Guardar carrito local
  function saveLocalCart(newCart) {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  // 🛒 Añadir producto
  async function addToCart(product) {
    const token = getToken();
    if (!token) {
      const newCart = [...cart, product];
      saveLocalCart(newCart);
      return;
    }

    const payload = {
      product_id: product.id,
      quantity: product.quantity,
      size: product.size,
    };

    const data = await apiFetch("/api/cart", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    setCart(normalizeCartResponse(data));
  }

  // ✏️ Actualizar cantidad
  async function updateQuantity(productId, quantity) {
    const token = getToken();
    if (!token) {
      const newCart = cart.map(item =>
        (item.id === productId || item.product_id === productId)
          ? { ...item, quantity }
          : item
      );
      saveLocalCart(newCart);
      return;
    }

    const data = await apiFetch(`/api/cart/${productId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });

    setCart(normalizeCartResponse(data));
  }

  // ❌ Eliminar producto
  async function removeFromCart(productId) {
    const token = getToken();
    if (!token) {
      const newCart = cart.filter(item =>
        (item.id !== productId && item.product_id !== productId)
      );
      saveLocalCart(newCart);
      return;
    }

    const data = await apiFetch(`/api/cart/${productId}`, {
      method: "DELETE",
    });

    setCart(normalizeCartResponse(data));
  }

  // 🗑️ Vaciar carrito
  async function clearCart() {
    const token = getToken();
    if (!token) {
      saveLocalCart([]);
      return;
    }

    // ✅ Tu backend usa POST en /api/cart/clear
    await apiFetch("/api/cart/clear", { method: "POST" });
    setCart([]);
  }

  // 🔄 Sincronizar carrito local al backend (cuando el usuario hace login)
  async function syncCart() {
    const token = getToken();
    if (!token) return; // solo si hay login

    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (localCart.length === 0) return;

    try {
      // Enviar cada item del carrito local al backend
      for (const item of localCart) {
        await apiFetch("/api/cart", {
          method: "POST",
          body: JSON.stringify({
            product_id: item.id || item.product_id,
            quantity: item.quantity || 1,
            size: item.size || null,
          }),
        });
      }

      // Obtener carrito actualizado desde backend
      const data = await apiFetch("/api/cart");
      setCart(normalizeCartResponse(data));

      // Limpiar carrito local después de sincronizar
      localStorage.removeItem("cart");
    } catch (err) {
      console.error("Error al sincronizar carrito local:", err);
    }
  }

  return {
    cart,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    syncCart, // 👈 ahora exporta syncCart directamente
  };
}