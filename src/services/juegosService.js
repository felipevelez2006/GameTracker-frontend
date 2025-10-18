// src/services/juegosService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/juegos";

export const obtenerJuegos = async () => axios.get(API_URL);
export const crearJuego = async (data) => axios.post(API_URL, data);
export const eliminarJuego = async (id) => axios.delete(`${API_URL}/${id}`);
export const actualizarJuego = async (id, data) => axios.put(`${API_URL}/${id}`, data);
