import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">🎮 Bienvenido a <span>GameTracker</span></h1>
      <p className="home-subtitle">
        Organiza, analiza y comparte tu progreso en videojuegos con estilo.
      </p>
      <div className="home-buttons">
        <Link to="/biblioteca" className="home-btn">📚 Biblioteca</Link>
        <Link to="/estadisticas" className="home-btn">📈 Estadísticas</Link>
        <Link to="/reseñas" className="home-btn">📝 Reseñas</Link>
        <Link to="/perfil" className="home-btn">👤 Perfil</Link>
      </div>
    </div>
  );
}
