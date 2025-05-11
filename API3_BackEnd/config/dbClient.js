// config/dbClient.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Usa la URI completa de .env; si no existe, construye la de tipo mongodb://
const uri = process.env.MONGO_URI;

mongoose
  .connect(uri)
  .then(() => console.log("✅ Conectado a MongoDB con Mongoose"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

export default mongoose;

