from fastapi import FastAPI
from .database import engine, Base
from .routers import books, authors

# Crea las tablas si no existen
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Library Catalog API")

# Incluye routers
app.include_router(authors.router)
app.include_router(books.router)
