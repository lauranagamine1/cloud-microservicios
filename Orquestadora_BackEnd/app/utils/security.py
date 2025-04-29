import bcrypt

def encriptar_password(password: str) -> str:
    password_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password_bytes, salt)
    return hashed.decode('utf-8')

def verificar_password(password_plano: str, password_hash: str) -> bool:
    return bcrypt.checkpw(password_plano.encode('utf-8'), password_hash.encode('utf-8'))
