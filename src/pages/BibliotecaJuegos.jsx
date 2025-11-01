import React, { useEffect, useState } from "react";
import {
  getJuegos,
  crearJuego,
  eliminarJuego,
} from "../services/juegosService";
import "./BibliotecaJuegos.css";

export default function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([]);
  const [filtros, setFiltros] = useState({
    genero: "Todos",
    plataforma: "Todos",
    completado: "Todos",
  });

  const [nuevoJuego, setNuevoJuego] = useState({
    nombre: "",
    genero: "",
    plataforma: "",
    horasJugadas: 0,
    completado: false,
  });

  const [editandoId, setEditandoId] = useState(null);
  const [editandoJuego, setEditandoJuego] = useState({});
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

  // ------- FILTRADO DINÁMICO -------
  const generosUnicos = ["Todos", ...new Set(juegos.flatMap(j => j.genero.split(",").map(s => s.trim())))];
  const plataformasUnicas = ["Todos", ...new Set(juegos.flatMap(j => j.plataforma.split(",").map(s => s.trim())))];

  const juegosFiltrados = juegos.filter(j => {
    return (
      (filtros.genero === "Todos" || j.genero.includes(filtros.genero)) &&
      (filtros.plataforma === "Todos" || j.plataforma.includes(filtros.plataforma)) &&
      (filtros.completado === "Todos" ||
        (filtros.completado === "Completados" && j.completado) ||
        (filtros.completado === "En progreso" && !j.completado))
    );
  });

  const handleFiltroChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

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

  const handleEdit = (juego) => {
    setEditandoId(juego._id);
    setEditandoJuego({ ...juego });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditandoJuego((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCancelEdit = () => {
    setEditandoId(null);
    setEditandoJuego({});
  };

  async function handleSaveEdit(id) {
    setJuegos((prev) =>
      prev.map((j) => (j._id === id ? { ...editandoJuego } : j))
    );
    setEditandoId(null);
  }

  return (
    <div className="biblioteca-container">
      <h2>🎮 Mi Biblioteca de Juegos</h2>

      {/* ---- BARRA DE FILTROS ---- */}
      <div className="filtros-container">
        <select name="genero" value={filtros.genero} onChange={handleFiltroChange}>
          {generosUnicos.map(g => <option key={g}>{g}</option>)}
        </select>

        <select name="plataforma" value={filtros.plataforma} onChange={handleFiltroChange}>
          {plataformasUnicas.map(p => <option key={p}>{p}</option>)}
        </select>

        <select name="completado" value={filtros.completado} onChange={handleFiltroChange}>
          <option>Todos</option>
          <option>Completados</option>
          <option>En progreso</option>
        </select>
      </div>

      {/* ---- FORMULARIO DE AGREGAR ---- */}
      <section className="biblioteca-form">
        <form onSubmit={handleSubmit} style={{ display: "contents" }}>
          <input name="nombre" type="text" placeholder="Título del juego" value={nuevoJuego.nombre} onChange={handleChange} />
          <input name="genero" type="text" placeholder="Género (separa con comas)" value={nuevoJuego.genero} onChange={handleChange} />
          <input name="plataforma" type="text" placeholder="Plataforma" value={nuevoJuego.plataforma} onChange={handleChange} />
          <input name="horasJugadas" type="number" placeholder="Horas jugadas" value={nuevoJuego.horasJugadas} onChange={handleChange} />
          <label>
            <input name="completado" type="checkbox" checked={nuevoJuego.completado} onChange={handleChange} /> Completado
          </label>
          <button type="submit">Agregar</button>
        </form>
      </section>

      {/* ---- LISTA FILTRADA ---- */}
      <section className="biblioteca-lista">
        {juegosFiltrados.map((j) => (
          <article key={j._id} className="juego-card">
            {editandoId === j._id ? (
              <div className="edit-mode">
                <input name="nombre" type="text" value={editandoJuego.nombre} onChange={handleEditChange} />
                <input name="genero" type="text" value={editandoJuego.genero} onChange={handleEditChange} />
                <input name="plataforma" type="text" value={editandoJuego.plataforma} onChange={handleEditChange} />
                <input name="horasJugadas" type="number" value={editandoJuego.horasJugadas} onChange={handleEditChange} />
                <label>
                  <input name="completado" type="checkbox" checked={editandoJuego.completado} onChange={handleEditChange} /> Completado
                </label>
                <div className="edit-buttons">
                  <button onClick={() => handleSaveEdit(j._id)}>💾 Guardar</button>
                  <button onClick={handleCancelEdit}>❌ Cancelar</button>
                </div>
              </div>
            ) : (
              <>
                <h3>{j.nombre}</h3>
                <p><strong>Género:</strong> {j.genero}</p>
                <p><strong>Plataforma:</strong> {j.plataforma}</p>
                <p><strong>Horas jugadas:</strong> {j.horasJugadas}</p>
                <p><strong>Estado:</strong> {j.completado ? "✅ Completado" : "🕹️ En progreso"}</p>

                <div className="card-buttons">
                  <button onClick={() => handleEdit(j)}>Editar</button>
                  <button className="btn-eliminar" onClick={() => handleDelete(j._id)}>Eliminar</button>
                </div>
              </>
            )}
          </article>
        ))}
      </section>
    </div>
  );
}
