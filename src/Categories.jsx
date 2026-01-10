import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <div className="categories">
      <h2>Categorías</h2>
      <Link to="/collares">Collares</Link>
      <Link to="/pulseras">Pulseras</Link>
    </div>
  );
}