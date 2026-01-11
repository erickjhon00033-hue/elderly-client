import { useState, useEffect } from "react";
import { apiFetch, getToken } from "../config";

export function useCart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Al montar, carga el carrito del backend
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
        setCart(data);
      } catch (err) {
        console.error("Error al cargar carrito:", err);
        setCart([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

  // Añadir producto al carrito
  async function addToCart(product) {
    const token = getToken();
    if (!token) throw new Error("Usuario no autenticado");

    const data = await apiFetch("/api/cart", {
      method: "POST",
      body: JSON.stringify(product),
    });
    setCart(data);
  }

  // Actualizar cantidad de un producto
  async function updateQuantity(productId, quantity) {
    const token = getToken();
    if (!token) throw new Error("Usuario no autenticado");

    const data = await apiFetch(`/api/cart/${productId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });
    setCart(data);
  }

  // Eliminar producto del carrito
  async function removeFromCart(productId) {
    const token = getToken();
    if (!token) throw new Error("Usuario no autenticado");

    const data = await apiFetch(`/api/cart/${productId}`, {
      method: "DELETE",
    });
    setCart(data);
  }

  // Vaciar carrito
  async function clearCart() {
    const token = getToken();
    if (!token) throw new Error("Usuario no autenticado");

    const data = await apiFetch("/api/cart/clear", {
      method: "POST",
    });
    setCart(data);
  }

  return { cart, loading, addToCart, updateQuantity, removeFromCart, clearCart };
}