import { useState, useEffect } from "react";
import { apiFetch, getToken } from "../config";

export function useCart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔧 Helper para normalizar la respuesta del backend
  function normalizeCartResponse(data) {
    console.log("Respuesta backend carrito:", data); // 👈 depuración en consola

    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.cart)) return data.cart;
    if (data && Array.isArray(data.items)) return data.items;
    if (data && Array.isArray(data.data)) return data.data; // 👈 cubrir más casos
    return [];
  }

  // 📦 Al montar, carga el carrito del backend
  useEffect(() => {
    async function fetchCart() {
      try {
        const token = getToken();
        if (!token) {
          setCart([]);
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

  // 🛒 Añadir producto al carrito
  async function addToCart(product) {
    const token = getToken();
    if (!token) throw new Error("Usuario no autenticado");

    const payload = {
      product_id: product.id,
      quantity: product.quantity,
      size: product.size,
    };

    const data = await apiFetch("/api/cart", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    console.log("Respuesta addToCart:", data); // 👈 depuración
    setCart(normalizeCartResponse(data));
  }

  // ✏️ Actualizar cantidad de un producto
  async function updateQuantity(productId, quantity) {
    const token = getToken();
    if (!token) throw new Error("Usuario no autenticado");

    const data = await apiFetch(`/api/cart/${productId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });

    console.log("Respuesta updateQuantity:", data); // 👈 depuración
    setCart(normalizeCartResponse(data));
  }

  // ❌ Eliminar producto del carrito
  async function removeFromCart(productId) {
    const token = getToken();
    if (!token) throw new Error("Usuario no autenticado");

    const data = await apiFetch(`/api/cart/${productId}`, {
      method: "DELETE",
    });

    console.log("Respuesta removeFromCart:", data); // 👈 depuración
    setCart(normalizeCartResponse(data));
  }

  // 🗑️ Vaciar carrito
  async function clearCart() {
    const token = getToken();
    if (!token) throw new Error("Usuario no autenticado");

    await apiFetch("/api/cart/clear", { method: "DELETE" });
    setCart([]); // 👈 vaciar estado directamente
  }

  return { cart, loading, addToCart, updateQuantity, removeFromCart, clearCart };
}