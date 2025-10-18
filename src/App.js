import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BibliotecaJuegos from "./pages/BibliotecaJuegos";
import Reseñas from "./pages/Reseñas";
import Estadisticas from "./pages/Estadisticas";
import Perfil from "./pages/Perfil";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/biblioteca" element={<BibliotecaJuegos />} />
          <Route path="/reseñas" element={<Reseñas />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
