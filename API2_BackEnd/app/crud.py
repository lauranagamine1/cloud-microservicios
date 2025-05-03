from sqlalchemy.orm import Session
from . import models, schemas
from typing import List

# --- Authors ---
def get_author(db: Session, author_id: int):
    return db.query(models.Author).filter(models.Author.id == author_id).first()

def get_author_by_name(db: Session, name: str):
    return db.query(models.Author).filter(models.Author.name == name).first()

def get_authors(db: Session, skip: int = 0, limit: int = 100) -> List[models.Author]:
    return db.query(models.Author).offset(skip).limit(limit).all()

def create_author(db: Session, author: schemas.AuthorCreate):
    db_author = models.Author(name=author.name)
    db.add(db_author)
    db.commit()
    db.refresh(db_author)
    return db_author

def delete_author(db: Session, author_id: int):
    db_author = db.query(models.Author).filter(models.Author.id == author_id).first()
    if db_author:
        db.delete(db_author)
        db.commit()
    return db_author

# --- Books ---
def get_book(db: Session, book_id: int):
    return db.query(models.Book).filter(models.Book.id == book_id).first()

def get_books(db: Session, skip: int = 0, limit: int = 100) -> List[models.Book]:
    return db.query(models.Book).offset(skip).limit(limit).all()

def search_books(db: Session, query: str) -> List[models.Book]:
    return (
        db.query(models.Book)
          .join(models.Author)
          .filter(
              (models.Book.title.ilike(f"%{query}%")) |
              (models.Author.name.ilike(f"%{query}%"))
          )
          .all()
    )

def create_book(db: Session, book: schemas.BookCreate):
    db_book = models.Book(**book.dict())
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

def update_book(db: Session, book_id: int, book: schemas.BookCreate):
    db_book = get_book(db, book_id)
    if not db_book:
        return None
    for field, value in book.dict().items():
        setattr(db_book, field, value)
    db.commit()
    db.refresh(db_book)
    return db_book

def delete_book(db: Session, book_id: int):
    db_book = get_book(db, book_id)
    if db_book:
        db.delete(db_book)
        db.commit()
    return db_book
