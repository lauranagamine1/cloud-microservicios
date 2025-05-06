// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

import Login from './components/Login';
import Register from './components/Register';
import Catalog from './components/Catalog';
import MyLoans from './components/MyLoans';
import PerfilUsuario from './components/PerfilUsuario';
import PrivateRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/catalog"
          element={
            <PrivateRoute>
              <Catalog />
            </PrivateRoute>
          }
        />
        <Route
          path="/loans"
          element={
            <PrivateRoute>
              <MyLoans />
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <PerfilUsuario />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
