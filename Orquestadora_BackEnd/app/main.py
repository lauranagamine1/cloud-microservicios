from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Importa los routers existentes
from app.routers import usuarios_router, libros_router, prestamos_router
# Puedes agregar más routers aquí en el futuro
# from app.routers import rent_router, devoluciones_router, admin_router

app = FastAPI(
    title="API Orquestadora - Sistema de Biblioteca",
    description="Administra usuarios, libros y préstamos a través de microservicios",
    version="1.0.0"
)

# CORS para permitir que React (en localhost:3000) se conecte
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],  # Cambia esto si usas dominio externo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar routers (endpoints agrupados)
app.include_router(usuarios_router.router)
app.include_router(libros_router.router)
app.include_router(prestamos_router.router)
# app.include_router(rent_router.router)  # si lo pones en archivo aparte

# Ruta raíz para verificar si el servidor está activo
@app.get("/", tags=["root"])
def read_root():
    return {"mensaje": "API Orquestadora corriendo 🚀"}