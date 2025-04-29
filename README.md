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
- **Características nuevas:**
  - Campo `email` único a nivel de base de datos (`@Column(unique = true)`).
  - Nuevo endpoint `GET /users/buscar_por_email/{email}` para búsqueda por email.
  - Validación automática de unicidad de correo electrónico.
  - Contraseñas almacenadas en forma de hash en la base de datos (bcrypt).

**Endpoints expuestos:**

| Método | Ruta | Descripción |
|:------:|:----:|:-----------:|
| `POST` | `/users` | Crear un nuevo usuario |
| `GET` | `/users/{id}` | Obtener información de un usuario por ID |
| `GET` | `/users/buscar_por_email/{email}` | Buscar usuario por email |
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
- **Librerías de seguridad:** bcrypt (encriptar contraseñas), PyJWT (manejo de tokens JWT)
- **Manejo de autenticación:**
  - Validación de contraseñas seguras:
    - Mínimo 6 caracteres.
    - Al menos una letra mayúscula.
    - Al menos un número.
  - Login de usuarios y generación de tokens JWT.
  - Verificación de tokens JWT para proteger rutas.

**Endpoints orquestados:**

| Método | Ruta | Descripción |
|:------:|:----:|:-----------:|
| `POST` | `/users/` | Crear usuario (orquesta hacia microservicio Java) |
| `GET`  | `/users/{id}` | Obtener usuario por ID (orquesta hacia microservicio Java) |
| `POST` | `/users/login` | Login de usuario y generación de token JWT |
| `GET`  | `/users/protected` | Ruta protegida accesible solo con token válido |

---

### 🌐 Frontend (React + Bootstrap)

- **Framework:** React
- **Estilos:** Bootstrap 5
- **Manejo de estado:** React Hooks (useState, useEffect)
- **Peticiones HTTP:** fetch API
- **Almacenamiento local:** localStorage
- **Librerías adicionales:** jwt-decode (para leer datos del token JWT)

**Componentes principales:**

| Componente | Funcionalidad |
|:----------:|:-------------:|
| `CrearUsuario.jsx` | Formulario para registrar un nuevo usuario con validación de contraseña segura |
| `Login.jsx` | Formulario para iniciar sesión y guardar el token JWT |
| `PerfilUsuario.jsx` | Visualizar datos del usuario actualmente logueado utilizando el token JWT |

---

## 🛠 Flujo de Arquitectura

```plaintext
[ React Frontend (localhost:5173) ]
        ↓ (fetch)
[ API Orquestadora FastAPI (localhost:8000/users/) ]
        ↓ (requests)
[ Microservicio Java Spring Boot (localhost:8080/users) ]
        ↓
[ Base de datos MySQL ]
