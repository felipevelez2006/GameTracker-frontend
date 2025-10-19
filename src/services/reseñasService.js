import API_BASE_URL from "./api";

export async function getResenas() {
  const res = await fetch(`${API_BASE_URL}/resenas`);
  if (!res.ok) throw new Error("Error al obtener las reseñas");
  return res.json();
}

export async function crearResena(nuevaReseña) {
  const res = await fetch(`${API_BASE_URL}/resenas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevaReseña),
  });
  if (!res.ok) throw new Error("Error al crear la reseña");
  return res.json();
}

export async function eliminarResena(id) {
  const res = await fetch(`${API_BASE_URL}/reseñas/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar la reseña");
  return res.json();
}
