// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../App.css';
import logo from '../logo.png';

function Navbar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  let user = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      user = decoded.sub;
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
    <nav className="navbar-custom">
      <div className="navbar-left">
        <img src={logo} alt="EasyBooks logo" className="navbar-logo" />
        <h3 className="navbar-title">EasyBooks</h3>
      </div>
      <div className="navbar-links">
        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        )}
        {token && (
          <>
            <Link to="/catalog">Catálogo</Link>
            <Link to="/perfil">Mi Perfil</Link>
            <Link to="/loans">Mis Préstamos</Link>
            <button className="logout-btn" onClick={handleLogout}>Salir</button>
          </>
        )}
      </div>
      {user && <span className="navbar-welcome">Bienvenido, {user}</span>}
    </nav>
  );
}

export default Navbar;
