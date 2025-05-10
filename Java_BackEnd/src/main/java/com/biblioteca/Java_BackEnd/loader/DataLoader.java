package com.biblioteca.Java_BackEnd.loader;

// src/main/java/com/biblioteca/Java_BackEnd/loader/DataLoader.java

import com.biblioteca.Java_BackEnd.model.Usuario;
import com.biblioteca.Java_BackEnd.repository.UsuarioRepository;
import com.github.javafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;



import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Component
public class DataLoader implements CommandLineRunner {
    private final UsuarioRepository repo;

    public DataLoader(UsuarioRepository repo) {
        this.repo = repo;
    }

    @Override
    public void run(String... args) {
        long existentes = repo.count();
        if (existentes == 0) {
            Faker faker = new Faker(new Locale("es"));
            List<Usuario> batch = new ArrayList<>();
            for (int i = 1; i <= 20_000; i++) {
                Usuario u = new Usuario();
                u.setNombre(faker.name().fullName());
                u.setEmail("user" + i + "@ejemplo.com");
                u.setPassword(faker.internet().password(6, 12, true, true));
                u.setTelefono(faker.phoneNumber().cellPhone());
                u.setDireccion(faker.address().streetAddress());
                u.setDistrito(faker.address().city());
                u.setDepartamento(faker.address().state());
                batch.add(u);

                if (batch.size() == 1_000) {
                    repo.saveAll(batch);
                    batch.clear();
                }
            }
            if (!batch.isEmpty()) {
                repo.saveAll(batch);
            }
            System.out.println("✅ Insertados 20 000 usuarios");
        } else {
            System.out.printf("⚠️ Omitido seed: ya existen %d usuarios.%n", existentes);
        }
    }
}

