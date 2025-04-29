package com.biblioteca.Java_BackEnd.controller;

import com.biblioteca.Java_BackEnd.model.Usuario;
import com.biblioteca.Java_BackEnd.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // POST /users → Crear nuevo usuario
    @PostMapping
    public Usuario crearUsuario(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // GET /users/{id} → Obtener info de usuario
    @GetMapping("/{id}")
    public Optional<Usuario> obtenerUsuarioPorId(@PathVariable Long id) {
        return usuarioRepository.findById(id);
    }

    // GET /users → Listar todos los usuarios
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    // PUT /users/{id} → Actualizar datos de usuario
    @PutMapping("/{id}")
    public Usuario actualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioActualizado) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuario.setNombre(usuarioActualizado.getNombre());
                    usuario.setEmail(usuarioActualizado.getEmail());
                    usuario.setTelefono(usuarioActualizado.getTelefono());
                    usuario.setPassword(usuarioActualizado.getPassword());
                    usuario.setDireccion(usuarioActualizado.getDireccion());
                    usuario.setDistrito(usuarioActualizado.getDistrito());
                    usuario.setDepartamento(usuarioActualizado.getDepartamento());
                    usuario.setEstado(usuarioActualizado.isEstado());
                    return usuarioRepository.save(usuario);
                })
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));
    }

    // DELETE /users/{id} → Eliminar usuario
    @DeleteMapping("/{id}")
    public String eliminarUsuario(@PathVariable Long id) {
        usuarioRepository.deleteById(id);
        return "Usuario eliminado exitosamente.";
    }

    @GetMapping("/buscar_por_email/{email}")
    public Usuario obtenerUsuarioPorEmail(@PathVariable String email) {
        return usuarioRepository.findByEmail(email);
    }
}
