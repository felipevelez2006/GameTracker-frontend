import React, { useEffect, useState } from "react";
import { getResenas, crearResena, eliminarResena } from "../services/reseñasService";
import "./Reseñas.css";

export default function Reseñas() {
  const [reseñas, setReseñas] = useState([]);
  const [nuevaReseña, setNuevaReseña] = useState({
    juego: "",
    autor: "",
    texto: "",
    calificacion: 0,
  });

  useEffect(() => {
    cargarReseñas();
  }, []);

  async function cargarReseñas() {
    try {
      const data = await getResenas();
      setReseñas(data);
    } catch (error) {
      console.error("Error al cargar reseñas:", error);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    try {
      const reseñaCreada = await crearResena(nuevaReseña);
      setReseñas([...reseñas, reseñaCreada]);
      setNuevaReseña({ juego: "", autor: "", texto: "", calificacion: 0 });
    } catch (error) {
      console.error("Error al crear reseña:", error);
    }
  }

  async function handleDelete(id) {
    try {
      await eliminarResena(id);
      setReseñas(reseñas.filter(r => r._id !== id));
    } catch (error) {
      console.error("Error al eliminar reseña:", error);
    }
  }

  return (
    <div className="reseñas-container">
      <h1>⭐ Reseñas de Juegos</h1>

      <form onSubmit={handleAdd} className="reseña-form">
        <input
          type="text"
          placeholder="Nombre del juego"
          value={nuevaReseña.juego}
          onChange={e => setNuevaReseña({ ...nuevaReseña, juego: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Tu nombre"
          value={nuevaReseña.autor}
          onChange={e => setNuevaReseña({ ...nuevaReseña, autor: e.target.value })}
          required
        />
        <textarea
          placeholder="Escribe tu reseña..."
          value={nuevaReseña.texto}
          onChange={e => setNuevaReseña({ ...nuevaReseña, texto: e.target.value })}
          required
        ></textarea>
        <input
          type="number"
          placeholder="Calificación (0-10)"
          min="0"
          max="10"
          value={nuevaReseña.calificacion}
          onChange={e => setNuevaReseña({ ...nuevaReseña, calificacion: e.target.value })}
          required
        />
        <button type="submit">Agregar Reseña</button>
      </form>

      <div className="reseñas-lista">
        {reseñas.length === 0 ? (
          <p className="sin-reseñas">No hay reseñas aún. ¡Sé el primero en dejar una!</p>
        ) : (
          reseñas.map((r) => (
            <div key={r._id} className="reseña-card">
              <h3>{r.juego}</h3>
              <p className="autor">Por {r.autor}</p>
              <p className="texto">“{r.texto}”</p>
              <p className="calificacion">Puntuación: {r.calificacion}/10</p>
              <button className="btn-eliminar" onClick={() => handleDelete(r._id)}>
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
