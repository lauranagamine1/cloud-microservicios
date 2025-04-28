from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import usuarios_router, libros_router, prestamos_router

app = FastAPI()

# CONFIGURAR CORS PERMITIENDO PETICIONES DESDE REACT (localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(usuarios_router.router)
app.include_router(libros_router.router)
app.include_router(prestamos_router.router)

@app.get("/")
def read_root():
    return {"mensaje": "API Orquestadora corriendo 🚀"}
