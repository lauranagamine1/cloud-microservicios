# cloud-microservicios
# 📚 Sistema de Gestión de Usuarios

Proyecto de microservicios usando Spring Boot, FastAPI y React para la gestión de usuarios en un sistema de bibliotecas.

---

## 🚀 Tecnologías utilizadas

### 🖥️ Microservicio de Usuarios (Backend Java - Spring Boot)

- **Lenguaje:** Java
- **Framework:** Spring Boot
- **Base de datos:** MySQL
- **ORM:** Spring Data JPA
- **Servidor embebido:** Tomcat
- **Dependencias clave:** Spring Web, Spring Data JPA, MySQL Driver

**Endpoints expuestos:**

| Método | Ruta | Descripción |
|:------:|:----:|:-----------:|
| `POST` | `/users` | Crear un nuevo usuario |
| `GET` | `/users/{id}` | Obtener información de un usuario por ID |
| `GET` | `/users/{id}/loans` | Ver préstamos de un usuario (futuro) |
| `PUT` | `/users/{id}` | Actualizar datos de un usuario |
| `DELETE` | `/users/{id}` | Eliminar un usuario |
| `GET` | `/users` | Listar todos los usuarios (solo para admin en el futuro) |

---

### 🐍 Orquestadora API (Backend Python - FastAPI)

- **Lenguaje:** Python
- **Framework:** FastAPI
- **Servidor web:** Uvicorn
- **Cliente HTTP:** Requests
- **Middleware:** CORS Middleware
- **Librerías de seguridad futura:** bcrypt (para encriptar contraseñas)

**Endpoints orquestados:**

| Método | Ruta | Descripción |
|:------:|:----:|:-----------:|
| `POST` | `/users/` | Crear usuario (orquesta hacia microservicio Java) |
| `GET` | `/users/{id}` | Obtener usuario por ID (orquesta hacia microservicio Java) |

---

### 🌐 Frontend (React + Bootstrap)

- **Framework:** React
- **Estilos:** Bootstrap 5
- **Manejo de estado:** React Hooks (useState, useEffect)
- **Peticiones HTTP:** fetch API
- **Almacenamiento local:** localStorage

**Componentes principales:**

| Componente | Funcionalidad |
|:----------:|:-------------:|
| `CrearUsuario.jsx` | Formulario para registrar un nuevo usuario |
| `PerfilUsuario.jsx` | Visualizar datos del usuario actualmente logueado |


---

## 🛠 Flujo de Arquitectura

```plaintext
[ React Frontend (localhost:3000) ]
        ↓ (fetch)
[ API Orquestadora FastAPI (localhost:8000/users/) ]
        ↓ (requests)
[ Microservicio Java Spring Boot (localhost:8080/users) ]
        ↓
[ Base de datos MySQL ]
