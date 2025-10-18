import axios from "axios";

const API_URL = "http://localhost:5000/api/juegos";

export const getJuegos = () => axios.get(API_URL);
export const getJuego = (id) => axios.get(`${API_URL}/${id}`);
export const createJuego = (data) => axios.post(API_URL, data);
export const updateJuego = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteJuego = (id) => axios.delete(`${API_URL}/${id}`);
