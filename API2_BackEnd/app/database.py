import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DB_USER = os.getenv("DB_USER", "postgres")         # por defecto: postgres
DB_PASSWORD = os.getenv("DB_PASSWORD", "root")     # por defecto: root
DB_HOST = os.getenv("DB_HOST", "localhost")        # opcional
DB_PORT = os.getenv("DB_PORT", "5432")             # opcional
DB_NAME = os.getenv("DB_NAME", "library_db")       # por defecto: library_db

DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
