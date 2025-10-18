import React from "react";
import "./Estadisticas.css";

export default function Estadisticas() {
  return (
    <div className="estadisticas-container">
      <h1>📈 Tus estadísticas</h1>
      <p>Visualiza tus hábitos de juego, progreso y rendimiento general.</p>
      <div className="estadisticas-card">
        <h3>Horas jugadas este mes</h3>
        <p className="numero">42</p>
      </div>
      <div className="estadisticas-card">
        <h3>Juegos completados</h3>
        <p className="numero">8</p>
      </div>
      <div className="estadisticas-card">
        <h3>Promedio de progreso</h3>
        <p className="numero">67%</p>
      </div>
    </div>
  );
}
        