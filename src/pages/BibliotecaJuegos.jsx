import React, { useEffect, useState } from "react";
import {
  getJuegos,
  crearJuego,
  eliminarJuego,
} from "../services/juegosService";
import "./BibliotecaJuegos.css";

export default function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([]);
  const [nuevoJuego, setNuevoJuego] = useState({
    nombre: "",
    genero: "",
    plataforma: "",
    horasJugadas: 0,
    completado: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarJuegos();
  }, []);

  async function cargarJuegos() {
    setLoading(true);
    setError("");
    try {
      const data = await getJuegos();
      setJuegos(
        data.map((g) => ({
          _id: g._id || g.id,
          nombre: g.nombre || g.title || "",
          genero:
            g.genero || (g.genres ? g.genres.join(", ") : "") || g.genre || "",
          plataforma:
            g.plataforma ||
            (g.platforms ? g.platforms.join(", ") : "") ||
            g.platform ||
            "",
          horasJugadas: g.horasJugadas ?? g.hoursPlayed ?? 0,
          completado: !!g.completado,
        }))
      );
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los juegos. Revisa el backend.");
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNuevoJuego((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nuevoJuego.nombre.trim()) return;
    setError("");
    try {
      const payload = {
        title: nuevoJuego.nombre,
        developer: "",
        genres: nuevoJuego.genero
          ? nuevoJuego.genero.split(",").map((s) => s.trim())
          : [],
        platforms: nuevoJuego.plataforma
          ? nuevoJuego.plataforma.split(",").map((s) => s.trim())
          : [],
        hoursPlayed: Number(nuevoJuego.horasJugadas) || 0,
        completed: Boolean(nuevoJuego.completado),
      };

      const creado = await crearJuego(payload);
      setJuegos((prev) => [
        ...prev,
        {
          _id: creado._id || creado.id,
          nombre: creado.title || nuevoJuego.nombre,
          genero:
            (creado.genres && creado.genres.join(", ")) || nuevoJuego.genero,
          plataforma:
            (creado.platforms && creado.platforms.join(", ")) ||
            nuevoJuego.plataforma,
          horasJugadas:
            creado.hoursPlayed ?? Number(nuevoJuego.horasJugadas),
          completado: creado.completed ?? nuevoJuego.completado,
        },
      ]);
      setNuevoJuego({
        nombre: "",
        genero: "",
        plataforma: "",
        horasJugadas: 0,
        completado: false,
      });
    } catch (err) {
      console.error(err);
      setError("Error al crear el juego.");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("¿Eliminar este juego?")) return;
    setError("");
    try {
      await eliminarJuego(id);
      setJuegos((prev) => prev.filter((j) => j._id !== id));
    } catch (err) {
      console.error(err);
      setError("Error al eliminar el juego.");
    }
  }

  return (
    <div className="biblioteca-container">
      <h2>🎮 Mi Biblioteca de Juegos</h2>

      <section className="biblioteca-form" aria-labelledby="add-game">
        <form onSubmit={handleSubmit} style={{ display: "contents" }}>
          <input
            name="nombre"
            type="text"
            placeholder="Título del juego"
            value={nuevoJuego.nombre}
            onChange={handleChange}
            aria-label="Título"
          />
          <input
            name="genero"
            type="text"
            placeholder="Género (separa con comas)"
            value={nuevoJuego.genero}
            onChange={handleChange}
            aria-label="Género"
          />
          <input
            name="plataforma"
            type="text"
            placeholder="Plataforma (PC, PS5, Switch)"
            value={nuevoJuego.plataforma}
            onChange={handleChange}
            aria-label="Plataforma"
          />
          <input
            name="horasJugadas"
            type="number"
            placeholder="Horas jugadas"
            value={nuevoJuego.horasJugadas}
            onChange={handleChange}
            aria-label="Horas jugadas"
            min="0"
            style={{ maxWidth: 120 }}
          />
          <label style={{ alignSelf: "center" }}>
            <input
              name="completado"
              type="checkbox"
              checked={nuevoJuego.completado}
              onChange={handleChange}
            />{" "}
            Completado
          </label>
          <button type="submit">Agregar</button>
        </form>
      </section>

      {loading ? <p style={{ color: "#cfe3ff" }}>Cargando juegos...</p> : null}
      {error ? <p style={{ color: "#ffb4b4" }}>{error}</p> : null}

      <section className="biblioteca-lista" aria-live="polite">
        {juegos.length === 0 && !loading ? (
          <p className="sin-juegos">Aún no tienes juegos en tu biblioteca.</p>
        ) : (
          juegos.map((j) => (
            <article key={j._id} className="juego-card">
              <h3>{j.nombre}</h3>
              <p><strong>Género:</strong> {j.genero || "—"}</p>
              <p><strong>Plataforma:</strong> {j.plataforma || "—"}</p>
              <p><strong>Horas jugadas:</strong> {j.horasJugadas}</p>
              <p>
                <strong>Estado:</strong>{" "}
                {j.completado ? "✅ Completado" : "🕹️ En progreso"}
              </p>

              <button
                className="btn-eliminar"
                onClick={() => handleDelete(j._id)}
                aria-label={`Eliminar ${j.nombre}`}
              >
                Eliminar
              </button>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
