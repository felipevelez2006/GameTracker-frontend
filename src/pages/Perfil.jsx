import React from "react";
import "./Perfil.css";

export default function Perfil() {
  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="avatar"
          className="perfil-avatar"
        />
        <h2>Felipe Vélez</h2>
        <p className="perfil-username">@felipev</p>
        <p>Jugador apasionado por las matemáticas y la IA ⚡</p>
        <button className="perfil-btn">Editar perfil</button>
      </div>
    </div>
  );
}
