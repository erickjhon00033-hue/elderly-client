import React from "react";
import { Link } from "react-router-dom";

function Cancel() {
  return (
    <div className="cancel-page">
      <div className="cancel-card">
        <h2>❌ Pago cancelado</h2>
        <p>No te preocupes, tu carrito sigue guardado.</p>
        <p>Puedes intentar nuevamente cuando lo desees.</p>

        {/* Botón estilizado */}
        <Link to="/checkout" className="retry-button">
          Intentar de nuevo
        </Link>
      </div>
    </div>
  );
}

export default Cancel;