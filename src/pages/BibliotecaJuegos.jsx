import React, { useEffect, useState } from "react";
import { getJuegos, crearJuego, eliminarJuego } from "../services/juegosService";
import "./BibliotecaJuegos.css";

export default function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([]);
  const [nuevoJuego, setNuevoJuego] = useState({
    titulo: "",
    genero: "",
    plataforma: "",
    horas: 0,
    completado: false,
  });

  useEffect(() => {
    cargarJuegos();
  }, []);

  async function cargarJuegos() {
    try {
      const data = await getJuegos();
      setJuegos(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    try {
      const juegoCreado = await crearJuego(nuevoJuego);
      setJuegos([...juegos, juegoCreado]);
      setNuevoJuego({ titulo: "", genero: "", plataforma: "", horas: 0, completado: false });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id) {
    try {
      await eliminarJuego(id);
      setJuegos(juegos.filter(j => j._id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="biblioteca-container">
      <h1>🎮 Mi Biblioteca de Juegos</h1>

      <form onSubmit={handleAdd} className="formulario">
        <input
          type="text"
          placeholder="Título del juego"
          value={nuevoJuego.titulo}
          onChange={e => setNuevoJuego({ ...nuevoJuego, titulo: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Género"
          value={nuevoJuego.genero}
          onChange={e => setNuevoJuego({ ...nuevoJuego, genero: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Plataforma"
          value={nuevoJuego.plataforma}
          onChange={e => setNuevoJuego({ ...nuevoJuego, plataforma: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Horas jugadas"
          value={nuevoJuego.horas}
          onChange={e => setNuevoJuego({ ...nuevoJuego, horas: e.target.value })}
          min="0"
        />
        <label>
          <input
            type="checkbox"
            checked={nuevoJuego.completado}
            onChange={e => setNuevoJuego({ ...nuevoJuego, completado: e.target.checked })}
          />
          Completado
        </label>
        <button type="submit" className="btn-agregar">Agregar</button>
      </form>

      <div className="lista-juegos">
        {juegos.map(juego => (
          <div key={juego._id} className="juego-card">
            <h3>{juego.titulo}</h3>
            <p>🎯 {juego.genero}</p>
            <p>🎮 {juego.plataforma}</p>
            <p>⏱️ {juego.horas} horas</p>
            <p>📊 {juego.completado ? "Completado ✅" : "En progreso 🔄"}</p>
            <button onClick={() => handleDelete(juego._id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
