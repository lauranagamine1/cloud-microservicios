# app/models.py

from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship
from .database import Base

class Author(Base):
    __tablename__ = "authors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    # cascade para borrar libros si se elimina el autor
    books = relationship(
        "Book",
        back_populates="author",
        cascade="all, delete-orphan",
        passive_deletes=True
    )

class Book(Base):
    __tablename__ = "books"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    author_id = Column(Integer, ForeignKey("authors.id", ondelete="CASCADE"), nullable=False)
    quantity = Column(Integer, default=1)
    published_year = Column(Integer, nullable=True)
    author = relationship("Author", back_populates="books")

