import React, { useEffect, useState } from "react";
import { obtenerJuegos, crearJuego, eliminarJuego } from "../services/juegosService";
import "./BibliotecaJuegos.css";

function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([]);
  const [nuevoJuego, setNuevoJuego] = useState({
    titulo: "",
    genero: "",
    plataforma: "",
    horasJugadas: 0,
    completado: false,
  });

  // Cargar juegos al iniciar
  useEffect(() => {
    fetchJuegos();
  }, []);

  const fetchJuegos = async () => {
    try {
      const res = await obtenerJuegos();
      setJuegos(res.data);
    } catch (err) {
      console.error("Error al obtener juegos:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNuevoJuego({
      ...nuevoJuego,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearJuego(nuevoJuego);
      setNuevoJuego({
        titulo: "",
        genero: "",
        plataforma: "",
        horasJugadas: 0,
        completado: false,
      });
      fetchJuegos();
    } catch (err) {
      console.error("Error al crear juego:", err);
    }
  };

  const handleEliminar = async (id) => {
    try {
      await eliminarJuego(id);
      fetchJuegos();
    } catch (err) {
      console.error("Error al eliminar juego:", err);
    }
  };

  return (
    <div className="biblioteca-container">
      <h1>🎮 Mi Biblioteca de Juegos</h1>

      <form className="juego-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="titulo"
          placeholder="Título del juego"
          value={nuevoJuego.titulo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="genero"
          placeholder="Género"
          value={nuevoJuego.genero}
          onChange={handleChange}
        />
        <input
          type="text"
          name="plataforma"
          placeholder="Plataforma"
          value={nuevoJuego.plataforma}
          onChange={handleChange}
        />
        <input
          type="number"
          name="horasJugadas"
          placeholder="Horas jugadas"
          value={nuevoJuego.horasJugadas}
          onChange={handleChange}
        />
        <label>
          <input
            type="checkbox"
            name="completado"
            checked={nuevoJuego.completado}
            onChange={handleChange}
          />{" "}
          Completado
        </label>
        <button type="submit">Agregar Juego</button>
      </form>

      <div className="juegos-lista">
        {juegos.length === 0 ? (
          <p>No hay juegos en tu biblioteca.</p>
        ) : (
          juegos.map((juego) => (
            <div key={juego._id} className="juego-card">
              <h3>{juego.titulo}</h3>
              <p><strong>Género:</strong> {juego.genero}</p>
              <p><strong>Plataforma:</strong> {juego.plataforma}</p>
              <p><strong>Horas:</strong> {juego.horasJugadas}</p>
              <p>
                <strong>Estado:</strong>{" "}
                {juego.completado ? "✅ Completado" : "🕹️ En progreso"}
              </p>
              <button onClick={() => handleEliminar(juego._id)}>Eliminar</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BibliotecaJuegos;
