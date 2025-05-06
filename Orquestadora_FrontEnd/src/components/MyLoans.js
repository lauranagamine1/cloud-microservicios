import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function MyLoans() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;

  const fetchLoans = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/prestamos/activos/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLoans(res.data);
    } catch (err) {
      console.error('Error al obtener préstamos', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (loanId, bookId) => {
    try {
      await axios.put('http://localhost:8000/prestamos/devolver', {
        loan_id: loanId,
        book_id: bookId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Libro devuelto correctamente');
      fetchLoans(); // Refresca los préstamos
    } catch (err) {
      console.error(err);
      alert('No se pudo devolver el libro');
    }
  };

  useEffect(() => {
    if (!token || !user) {
      navigate('/login');
    } else {
      fetchLoans();
    }
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
              <tr key={loan._id}>
                <td>{loan.book_title || loan.book_id}</td>
                <td>{new Date(loan.loan_date).toLocaleDateString()}</td>
                <td>{new Date(loan.return_date).toLocaleDateString()}</td>
                <td>{loan.status === 'returned' ? 'Devuelto' : 'Activo'}</td>
                <td>
                  {loan.status === 'active' && (
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleReturn(loan._id, loan.book_id)}
                    >
                      Devolver
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="btn btn-secondary mt-3" onClick={() => window.location.href = '/catalog'}>
      Volver al catálogo
       </button>
    </div>
  );
}

export default MyLoans;
