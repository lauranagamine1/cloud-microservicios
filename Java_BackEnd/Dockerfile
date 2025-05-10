# Etapa 1: Build de la app usando Maven y JDK 17
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Etapa 2: Imagen final solo con el jar
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/Java_BackEnd-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
