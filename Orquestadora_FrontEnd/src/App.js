import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Catalog from './components/Catalog';
import MyLoans from './components/MyLoans';
import PerfilUsuario from './components/PerfilUsuario';

function ProtectedRoute({ children }) {
  const user = localStorage.getItem('user');
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/catalog"
          element={
            <ProtectedRoute>
              <Catalog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loans"
          element={
            <ProtectedRoute>
              <MyLoans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <PerfilUsuario />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
