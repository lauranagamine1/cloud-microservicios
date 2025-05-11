// swagger.js
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Préstamos",
      version: "1.0.0",
      description: "Documentación de endpoints para préstamos"
    },
    servers: [
      { url: "http://localhost:3000", description: "Servidor local" }
    ]
  },
  // Aquí indicas dónde buscar tus rutas anotadas:
  apis: ["./routes/*.js", "./controllers/*.js"]
};

export default swaggerJsdoc(options);
