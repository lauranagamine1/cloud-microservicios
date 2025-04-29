package com.biblioteca.Java_BackEnd.repository;

import com.biblioteca.Java_BackEnd.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Metodo para buscar por email
    Usuario findByEmail(String email);
}

