# seed.py
from faker import Faker
from sqlalchemy.orm import Session
from .database import SessionLocal, engine, Base
from .models import Author, Book

def seed():
    fake = Faker("es_ES")
    db: Session = SessionLocal()

    # Asegúrate de que las tablas existen
    Base.metadata.create_all(bind=engine)

    # Sólo seedea si no hay libros
    if db.query(Book).count() == 0:
        # 1) Crear 1 000 autores
        authors = [Author(name=fake.name()) for _ in range(1_000)]
        db.bulk_save_objects(authors)
        db.commit()

        author_ids = [a.id for a in db.query(Author.id).all()]

        # 2) Crear 20 000 libros
        batch = []
        for i in range(20_000):
            batch.append(Book(
                title=fake.sentence(nb_words=3),
                author_id=fake.random_element(author_ids),
                quantity=fake.random_int(0, 20),
                published_year=int(fake.year())
            ))
            if len(batch) == 1_000:
                db.bulk_save_objects(batch)
                db.commit()
                batch.clear()

        if batch:
            db.bulk_save_objects(batch)
            db.commit()

        print("✅ 20 000 libros insertados")
    else:
        print("⚠️ Ya existen libros en la base, no se repite seed.")

    db.close()

if __name__ == "__main__":
    seed()
