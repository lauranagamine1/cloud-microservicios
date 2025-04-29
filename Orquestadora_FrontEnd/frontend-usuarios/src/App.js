import React, { useState } from 'react';
import CrearUsuario from './componentes/CrearUsuario';
import PerfilUsuario from './componentes/PerfilUsuario';
import Login from './componentes/Login'; // <--- importar

function App() {
    const [paginaActual, setPaginaActual] = useState('crearUsuario');

    const cambiarPagina = (pagina) => {
        setPaginaActual(pagina);
    };

    return (
        <div className="container mt-4">
            <h1>Mi Aplicación</h1>
            <div className="mb-4">
                <button className="btn btn-primary me-2" onClick={() => cambiarPagina('crearUsuario')}>Crear Usuario</button>
                <button className="btn btn-success me-2" onClick={() => cambiarPagina('login')}>Login</button>
                <button className="btn btn-secondary" onClick={() => cambiarPagina('perfilUsuario')}>Ver Perfil</button>
            </div>

            {paginaActual === 'crearUsuario' && <CrearUsuario />}
            {paginaActual === 'login' && <Login />}
            {paginaActual === 'perfilUsuario' && <PerfilUsuario />}
        </div>
    );
}

export default App;
