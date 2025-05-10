import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 🔥 Por defecto usamos la IP y PUERTO de la VM donde está la DB externa
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "root")
DB_HOST = os.getenv("DB_HOST", "172.31.30.170")   # <-- POR DEFECTO la IP de la VM
DB_PORT = os.getenv("DB_PORT", "4001")            # <-- POR DEFECTO el puerto mapeado externo
DB_NAME = os.getenv("DB_NAME", "library_db")

DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
