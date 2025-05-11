from fastapi import APIRouter, Depends, HTTPException, status, Header
import requests
import urllib.parse

from app.schemas.user_schema import UsuarioActualizar
from app.utils.security import encriptar_password, verificar_password  
from app.schemas.user_schema import UsuarioCrear, UsuarioLogin
from app.utils.jwt_manager import crear_token, verificar_token

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

USUARIOS_API_URL = "http://localhost:8080/users"

# Verificación de token
async def get_current_user(authorization: str = Header(...)):
    if authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token no enviado en formato Bearer"
        )

    try:
        payload = verificar_token(token)
        return payload
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token invalido o expirado",
        )

# Verificación de rol administrador
def validar_admin(user: dict = Depends(get_current_user)):
    if user.get("rol") != "admin":
        raise HTTPException(status_code=403, detail="Acceso solo para administradores")
    return user

@router.get("/", summary="Listar todos los usuarios", description="Solo accesible por administradores")
def listar_usuarios(_: dict = Depends(validar_admin)):
    response = requests.get(USUARIOS_API_URL)
    return response.json()

@router.get("/protected", summary="Ruta protegida de prueba", description="Acceso solo con token valido.")
def protected_route(current_user: dict = Depends(get_current_user)):
    return {"mensaje": f"Acceso concedido a {current_user['sub']}"}

@router.get("/{id}")
def obtener_usuario(id: int, user=Depends(get_current_user)):
    if user["rol"] != "admin" and user["id"] != id:
        raise HTTPException(status_code=403, detail="No tienes permiso para ver este perfil")
    
    response = requests.get(f"{USUARIOS_API_URL}/{id}")
    return response.json()


@router.post("/", summary="Registrar nuevo usuario", description="Registra un nuevo usuario.")
def crear_usuario(usuario: UsuarioCrear):
    usuario_dict = usuario.model_dump()
    usuario_dict["password"] = encriptar_password(usuario.password)

    response = requests.post(USUARIOS_API_URL, json=usuario_dict)

    if response.status_code not in (200, 201):
        return {"error": "No se pudo registrar el usuario. Puede que el correo ya exista o haya otro error."}

    return response.json()

@router.put("/{id}", summary="Actualizar usuario")
def actualizar_usuario(id: int, usuario: UsuarioActualizar):
    response = requests.put(f"{USUARIOS_API_URL}/{id}", json=usuario.model_dump(exclude_unset=True))

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="No se pudo actualizar el usuario")

    return response.json()

@router.delete("/{id}", summary="Eliminar usuario", description="Solo admins pueden eliminar usuarios")
def eliminar_usuario(id: int, _: dict = Depends(validar_admin)):
    response = requests.delete(f"{USUARIOS_API_URL}/{id}")
    return {"mensaje": "Usuario eliminado exitosamente"} if response.status_code == 200 else {"mensaje": "Error al eliminar"}

@router.post("/login", summary="Login de usuario", description="Login usando email y password.")
def login_usuario(usuario: UsuarioLogin):
    email_encoded = urllib.parse.quote(usuario.email)
    response = requests.get(f"{USUARIOS_API_URL}/buscar_por_email/{email_encoded}")

    if response.status_code != 200:
        return {"error": "Usuario no encontrado"}

    usuario_db = response.json()

    if not verificar_password(usuario.password, usuario_db["password"]):
        return {"error": "Contraseña incorrecta"}

    # CREAR TOKEN JWT CON ROL
    token = crear_token({
        "sub": usuario_db["email"],
        "id": usuario_db["id"],
        "rol": usuario_db.get("rol", "usuario")  # por defecto "usuario"
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }