import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(prev => !prev);
  const close = () => setOpen(false);

  const navItems = [
    { to: "/", label: "Inicio" },
    { to: "/biblioteca", label: "Biblioteca" },
    { to: "/reseñas", label: "Reseñas" },
    { to: "/estadisticas", label: "Estadísticas" },
    { to: "/perfil", label: "Perfil" }
  ];

  return (
    <header className="nav-header">
      <div className="nav-inner">
        <Link to="/" className="nav-brand" onClick={close} aria-label="GameTracker Home">
          <span className="nav-logo">🎮</span>
          <span className="nav-title">GameTracker</span>
        </Link>

        <button
          className={`nav-toggle ${open ? "open" : ""}`}
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={toggle}
        >
          <span className="hamburger" />
        </button>

        <nav className={`nav-menu ${open ? "open" : ""}`} aria-label="Main navigation">
          <ul>
            {navItems.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                  }
                  onClick={close}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
