import React from "react";
import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="success-page">
      <div className="success-card">
        <h2>✅ ¡Pago exitoso!</h2>
        <p>Gracias por tu compra en <strong>Elderly ✨</strong></p>
        <p>Tu pedido ha sido confirmado y pronto será procesado.</p>

        {/* Botón estilizado dorado con letras negras */}
        <Link to="/" className="back-button">
          Volver a la tienda
        </Link>
      </div>
    </div>
  );
}

export default Success;