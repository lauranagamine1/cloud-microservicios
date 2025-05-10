import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function Catalog() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  // Intentamos decodificar el token de forma segura
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('Usuario decodificado desde JWT:', decoded);
        setUser(decoded);
      } catch (e) {
        console.error('Token inválido:', e);
        localStorage.removeItem('token');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  const fetchBooks = async (q = '') => {
    try {
      const res = await axios.get(
        'http://orquestadora-alb-1826496426.us-east-1.elb.amazonaws.com/libros/',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      let filtered = res.data;
      if (q) {
        filtered = filtered.filter(book =>
          book.title.toLowerCase().includes(q.toLowerCase()) ||
          book.author.name.toLowerCase().includes(q.toLowerCase())
        );
      }

      // Si es usuario normal, mostrar solo libros disponibles
      if (user?.rol !== 'admin') {
        filtered = filtered.filter(book => book.quantity > 0);
      }

      setBooks(filtered);
    } catch (err) {
      console.error('Error al obtener libros', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBooks();
    }
    // eslint-disable-next-line
  }, [user]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(query);
  };

  const handleBorrow = async (bookId) => {
    try {
      await axios.post(
        'http://orquestadora-alb-1826496426.us-east-1.elb.amazonaws.com/prestamos/rentar',
        {
          user_id: String(user?.id),
          book_id: bookId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert('Préstamo solicitado con éxito');
      fetchBooks(query);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.detail || 'Error al solicitar préstamo');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Catálogo de Libros</h2>
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
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Autor: {book.author.name}</h6>
                  <p className="card-text">Cantidad disponible: {book.quantity}</p>
                  {user?.rol !== 'admin' && (
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
