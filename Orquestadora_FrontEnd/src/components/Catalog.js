import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function Catalog() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;
  const userId = user?.id;
  const rol = user?.rol;

  const fetchBooks = async (q = '') => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8000/libros?search=${encodeURIComponent(q)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data);
    } catch (err) {
      console.error('Error al obtener libros', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(query);
  };

  const handleBorrow = async (bookId) => {
    try {
      await axios.post('http://localhost:8000/prestamos/rentar', {
        user_id: String(userId),
        book_id: bookId,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Préstamo solicitado con éxito');
      fetchBooks(query);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.detail || 'Error al solicitar préstamo');
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center mb-4">
        <img src="/logo.png" alt="Logo" style={{ height: '50px', marginRight: '15px' }} />
        <h2 className="text-primary">Catálogo de Libros</h2>
      </div>

      <div className="mb-3">
        <button className="btn btn-outline-primary me-2" onClick={() => window.location.href = '/perfil'}>
          Ir a Mi Perfil
        </button>
        <button className="btn btn-outline-secondary" onClick={() => window.location.href = '/loans'}>
          Ver Mis Préstamos
        </button>
      </div>

      <p>Bienvenido, {user?.sub || 'Usuario'}</p>

      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por título o autor"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="submit">Buscar</button>
        </div>
      </form>

      {loading ? (
        <p>Cargando libros...</p>
      ) : (
        <div className="row">
          {books.map((book) => (
            <div key={book.id} className="col-md-4 mb-3">
              <div className="card h-100 p-3">
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Autor: {book.author.name}</h6>
                  <p className="card-text">Cantidad disponible: {book.quantity}</p>
                  {rol === 'admin' ? null : (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleBorrow(book.id)}
                      disabled={book.quantity <= 0}
                    >
                      Pedir préstamo
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Catalog;
