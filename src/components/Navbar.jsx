import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">🎮 GameTracker</div>
      <ul className="nav-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/biblioteca">Biblioteca</Link></li>
        <li><Link to="/reseñas">Reseñas</Link></li>
        <li><Link to="/estadisticas">Estadísticas</Link></li>
        <li><Link to="/perfil">Perfil</Link></li>
      </ul>
    </nav>
  );
}
