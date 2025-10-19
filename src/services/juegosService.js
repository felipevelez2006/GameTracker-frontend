import API_BASE_URL from "./api";

export async function getJuegos() {
  const res = await fetch(`${API_BASE_URL}/juegos`);
  if (!res.ok) throw new Error("Error al obtener los juegos");
  return res.json();
}

export async function crearJuego(nuevoJuego) {
  const res = await fetch(`${API_BASE_URL}/juegos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoJuego),
  });
  if (!res.ok) throw new Error("Error al crear el juego");
  return res.json();
}

export async function eliminarJuego(id) {
  const res = await fetch(`${API_BASE_URL}/juegos/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar el juego");
  return res.json();
}
