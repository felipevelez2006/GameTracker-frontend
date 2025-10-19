import React, { useState, useEffect } from "react";
import { getResenas, crearResena, eliminarResena } from "../services/reseñasService";
import { getJuegos } from "../services/juegosService";
import "./Reseñas.css";

function Reseñas() {
  const [reseñas, setReseñas] = useState([]);
  const [juegos, setJuegos] = useState([]);
  const [formData, setFormData] = useState({
    game: "",
    author: "",
    rating: "",
    content: "",
  });

  useEffect(() => {
    cargarReseñas();
    cargarJuegos();
  }, []);

  async function cargarReseñas() {
    try {
      const data = await getResenas();
      setReseñas(data);
    } catch (error) {
      console.error("Error cargando reseñas:", error);
    }
  }

  async function cargarJuegos() {
    try {
      const data = await getJuegos();
      setJuegos(data);
    } catch (error) {
      console.error("Error cargando juegos:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await crearResena(formData);
      setFormData({ game: "", author: "", rating: "", content: "" });
      cargarReseñas();
    } catch (error) {
      console.error("Error creando reseña:", error);
    }
  }

  async function handleDelete(id) {
    try {
      await eliminarResena(id);
      cargarReseñas();
    } catch (error) {
      console.error("Error eliminando reseña:", error);
    }
  }

  return (
    <div className="reseñas-container">
      <h2>📚 Reseñas de Juegos</h2>

      <form className="reseña-form" onSubmit={handleSubmit}>
        <select
          name="game"
          value={formData.game}
          onChange={(e) => setFormData({ ...formData, game: e.target.value })}
          required
        >
          <option value="">Selecciona un juego</option>
          {juegos.map((juego) => (
            <option key={juego._id} value={juego._id}>
              {juego.title}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Autor (opcional)"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        />
        <input
          type="number"
          placeholder="Puntuación (0-10)"
          min="0"
          max="10"
          required
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
        />
        <textarea
          placeholder="Escribe tu reseña..."
          required
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />
        <button type="submit">Agregar Reseña</button>
      </form>

      <div className="reseñas-lista">
        {reseñas.map((r) => (
          <div key={r._id} className="reseña-card">
            <h3>{r.game?.title || "Juego desconocido"}</h3>
            <p className="author">✍️ {r.author || "Anónimo"}</p>
            <p className="rating">⭐ {r.rating}/10</p>
            <p className="content">{r.content}</p>
            <button onClick={() => handleDelete(r._id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reseñas;
