from pydantic import BaseModel, Field, field_validator
import re
from typing import Optional

class UsuarioCrear(BaseModel):
    nombre: str
    email: str
    password: str = Field(..., min_length=6)
    telefono: Optional[str] = None
    direccion: Optional[str] = None
    distrito: Optional[str] = None
    departamento: Optional[str] = None

    @field_validator('password')
    @classmethod
    def validar_password(cls, v):
        if not re.search(r'[A-Z]', v):
            raise ValueError('La contraseña debe contener al menos una letra mayuscula')
        if not re.search(r'[0-9]', v):
            raise ValueError('La contraseña debe contener al menos un numero')
        return v

class UsuarioLogin(BaseModel):
    email: str
    password: str

class UsuarioActualizar(BaseModel):
    nombre: Optional[str]
    telefono: Optional[str]
    direccion: Optional[str]
    distrito: Optional[str]
    departamento: Optional[str]
    estado: Optional[bool]