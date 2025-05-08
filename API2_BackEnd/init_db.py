from app.models import Base  # o ajusta el path según tu estructura
from app.database import engine

Base.metadata.create_all(bind=engine)