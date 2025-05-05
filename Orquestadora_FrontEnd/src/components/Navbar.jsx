import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">BookLoan</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/register">Registro</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/catalog">Catálogo</Link></li>
            <li className="nav-item"><Link to="/perfil" className="nav-link">Mi Perfil</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/my-loans">Mis Préstamos</Link></li>
          </ul>
          <span className="navbar-text me-3">
            {user?.name}
          </span>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;