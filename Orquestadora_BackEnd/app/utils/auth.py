# auth.py (nuevo archivo para centralizar la autenticacion y autorizacion)
from fastapi import Header, HTTPException, status, Depends
from app.utils.jwt_manager import verificar_token

def get_current_user(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token no enviado en formato Bearer")

    token = authorization.split(" ")[1]
    try:
        return verificar_token(token)
    except Exception:
        raise HTTPException(status_code=401, detail="Token invalido o expirado")

def require_admin(user=Depends(get_current_user)):
    if user.get("rol") != "admin":
        raise HTTPException(status_code=403, detail="Acceso solo para administradores")
    return user

def require_user(user=Depends(get_current_user)):
    if user.get("rol") not in ["usuario", "user"]:
        raise HTTPException(status_code=403, detail="Acceso solo para usuarios normales")
    return user
