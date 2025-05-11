import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

function MyLoans() {
  const [loans, setLoans] = useState([]);
  const [bookTitles, setBookTitles] = useState({});
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;

  const fetchLoans = async () => {
    setLoading(true);
    try {
      // 1) Obtener préstamos activos
      const { data: activeLoans } = await axios.get(
        `http://localhost:9000/prestamos/activos/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLoans(activeLoans);

      // 2) IDs únicos
      const uniqueBookIds = [...new Set(activeLoans.map(l => l.book_id))];

      // 3) Peticiones paralelas para obtener títulos
      const titlesMap = {};
      await Promise.all(
        uniqueBookIds.map(async (id) => {
          try {
            const { data: book } = await axios.get(
              `http://localhost:9000/libros/${id}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            titlesMap[id] = book.title;
          } catch {
            titlesMap[id] = id; // fallback
          }
        })
      );
      setBookTitles(titlesMap);
    } catch (err) {
      console.error('Error al obtener préstamos', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (loanId, bookId) => {
    setReturningId(loanId);
    try {
      await axios.put(
        'http://localhost:9000/prestamos/devolver',
        { loan_id: loanId, book_id: bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchLoans();
    } catch (err) {
      console.error('Error al devolver', err);
      alert('No se pudo devolver el libro');
    } finally {
      setReturningId(null);
    }
  };

  useEffect(() => {
    if (!token || !user) {
      navigate('/login');
    } else {
      fetchLoans();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mt-5">
      <h2>Mis Préstamos</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : loans.length === 0 ? (
        <p>No tienes préstamos activos.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Título</th>
              <th>Fecha de préstamo</th>
              <th>Fecha de devolución</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id ?? loan._id}>
                <td>{bookTitles[loan.book_id] || loan.book_id}</td>
                <td>{new Date(loan.loan_date).toLocaleDateString()}</td>
                <td>{new Date(loan.return_date).toLocaleDateString()}</td>
                <td>{loan.status === 'returned' ? 'Devuelto' : 'Activo'}</td>
                <td>
                  {loan.status === 'active' && (
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleReturn(loan.id ?? loan._id, loan.book_id)}
                      disabled={returningId === (loan.id ?? loan._id)}
                    >
                      {returningId === (loan.id ?? loan._id) ? 'Devolviendo…' : 'Devolver'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button
        className="btn btn-secondary mt-3"
        onClick={() => navigate('/catalog')}
      >
        Volver al catálogo
      </button>
    </div>
  );
}

export default MyLoans;