from fastapi import APIRouter
import requests

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

USUARIOS_API_URL = "http://localhost:8080/users"

@router.get("/", summary="Listar todos los usuarios", description="Obtiene la lista completa de usuarios desde el microservicio de usuarios.")
def listar_usuarios():
    response = requests.get(USUARIOS_API_URL)
    return response.json()

@router.get("/{id}", summary="Obtener un usuario por ID", description="Busca un usuario específico por su ID en el microservicio de usuarios.")
def obtener_usuario(id: int):
    response = requests.get(f"{USUARIOS_API_URL}/{id}")
    return response.json()

@router.post("/", summary="Crear un nuevo usuario", description="Crea un nuevo usuario enviando los datos al microservicio de usuarios.")
def crear_usuario(usuario: dict):
    response = requests.post(USUARIOS_API_URL, json=usuario)
    return response.json()

@router.put("/{id}", summary="Actualizar usuario", description="Actualiza los datos de un usuario existente en el microservicio de usuarios.")
def actualizar_usuario(id: int, usuario: dict):
    response = requests.put(f"{USUARIOS_API_URL}/{id}", json=usuario)
    return response.json()

@router.delete("/{id}", summary="Eliminar usuario", description="Elimina un usuario del sistema a través del microservicio de usuarios.")
def eliminar_usuario(id: int):
    response = requests.delete(f"{USUARIOS_API_URL}/{id}")
    return {"mensaje": "Usuario eliminado exitosamente"} if response.status_code == 200 else {"mensaje": "Error al eliminar"}
