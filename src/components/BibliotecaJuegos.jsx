import { useEffect, useState } from "react";
import { getJuegos } from "../services/juegosService";

function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    getJuegos()
      .then((res) => setJuegos(res.data))
      .catch((err) => console.error("Error al obtener juegos:", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🎮 Biblioteca de Juegos</h1>
      {juegos.length === 0 ? (
        <p>No hay juegos registrados.</p>
      ) : (
        <ul>
          {juegos.map((juego) => (
            <li key={juego._id}>
              <strong>{juego.titulo}</strong> — {juego.plataforma}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BibliotecaJuegos;
