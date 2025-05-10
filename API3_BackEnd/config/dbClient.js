import mongoose from "mongoose";

// NUEVO: Cadena directa al Mongo local en la VM2 (sin auth, puerto 4003)
const MONGO_URL = 'mongodb://172.31.30.170:4003/loan';

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Conectado a MongoDB con Mongoose");
});

export default mongoose;
