// src/main/java/com/biblioteca/Java_BackEnd/config/CorsConfig.java
package com.biblioteca.Java_BackEnd.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                .addMapping("/**")                        // todas las rutas
                .allowedOrigins("http://localhost:3001")  // tu front
                .allowedMethods("*")                      // GET, POST, etc.
                .allowCredentials(true);
    }
}
