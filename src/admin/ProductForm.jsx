import React, { useState, useEffect } from "react";

function ProductForm({ token, editing, setEditing, onSuccess }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [material, setMaterial] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (editing) {
      setName(editing.name || "");
      setDescription(editing.description || "");
      setPrice(editing.price_cents ? (editing.price_cents / 100).toString() : "");
      setStock(editing.stock?.toString() || "");
      setImageUrl(editing.image_url || "");
      setCategory(editing.category || "");
      setMaterial(editing.material || "");
    }
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const payload = {
        name,
        description,
        price_cents: Math.round(parseFloat(price) * 100),
        stock: parseInt(stock),
        image_url: imageUrl,
        category,
        material,
      };

      const url = editing
        ? `${import.meta.env.VITE_API_BASE}/api/admin/products/${editing.id}`
        : `${import.meta.env.VITE_API_BASE}/api/admin/products`;

      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(data.message || (editing ? "✅ Producto actualizado" : "✅ Producto creado"));
        if (!editing) {
          setName("");
          setDescription("");
          setPrice("");
          setStock("");
          setImageUrl("");
          setCategory("");
          setMaterial("");
        }
        setEditing(null);
        onSuccess && onSuccess();
      } else {
        setError(data.message || "Error al guardar producto");
      }
    } catch (err) {
      console.error("Error guardando producto:", err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {editing ? "Editar producto" : "Crear nuevo producto"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Nombre:</label>
          <input
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Descripción:</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Precio (RD$):</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Stock:</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Imagen (URL):</label>
          <input
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Categoría:</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="collares">Collares</option>
            <option value="pulseras">Pulseras</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Material:</label>
          <input
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            placeholder="Ej: Plata, Oro, Cuero..."
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            {editing ? "Actualizar producto" : "Publicar producto"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors"
            >
              Cancelar edición
            </button>
          )}
        </div>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}
      {success && <p className="text-green-600 mt-4">{success}</p>}
    </div>
  );
}

export default ProductForm;