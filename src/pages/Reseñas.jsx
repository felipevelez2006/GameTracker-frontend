import React, { useState } from "react";
import "./Reseñas.css";

export default function Reseñas() {
  const [reseñas, setReseñas] = useState([]);
  const [juego, setJuego] = useState("");
  const [texto, setTexto] = useState("");

  const agregarReseña = () => {
    if (!juego || !texto) return;
    setReseñas([{ juego, texto }, ...reseñas]);
    setJuego("");
    setTexto("");
  };

  return (
    <div className="reseñas-container">
      <h1>📝 Reseñas</h1>
      <p>Comparte tus opiniones y experiencias con otros jugadores.</p>

      <div className="reseña-form">
        <input
          type="text"
          placeholder="Título del juego"
          value={juego}
          onChange={(e) => setJuego(e.target.value)}
        />
        <textarea
          placeholder="Escribe tu reseña..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button onClick={agregarReseña}>Agregar reseña</button>
      </div>

      <div className="reseñas-lista">
        {reseñas.map((r, i) => (
          <div key={i} className="reseña-card">
            <h3>{r.juego}</h3>
            <p>{r.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
