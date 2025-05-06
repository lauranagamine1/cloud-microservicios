// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Navbar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  let user = null;
  let rol = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      user = decoded.sub;
      rol = decoded.rol;
    } catch (e) {
      console.error("Token inválido");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">BookLoan</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">

            {!token && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Registro</Link></li>
              </>
            )}

            {token && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/catalog">Catálogo</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/perfil">Mi Perfil</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/loans">Mis Préstamos</Link></li>
              </>
            )}
          </ul>

          {user && (
            <>
              <span className="navbar-text me-3 text-white">Bienvenido, {user}</span>
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
