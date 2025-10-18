import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BibliotecaJuegos from "./pages/BibliotecaJuegos";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BibliotecaJuegos />} />
      </Routes>
    </Router>
  );
}

export default App;
