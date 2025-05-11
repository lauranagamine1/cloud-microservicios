// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
import Loan from "./models/loanSchema.js";

dotenv.config();

async function seed() {
  // 1) Conectar a MongoDB
  const uri =
    process.env.MONGO_URI ||
    `mongodb://${process.env.SERVER_DB}/${process.env.DB_NAME}`;
  await mongoose.connect(uri);
  console.log("🔌 MongoDB conectado para seed");

  // 2) Sólo seedear si no hay préstamos
  const existentes = await Loan.countDocuments();
  if (existentes > 0) {
    console.log(`⚠️ Omitido seed: ya hay ${existentes} préstamos`);
    await mongoose.disconnect();
    return;
  }

  // 3) Traer todos los IDs de usuarios y libros
  const API1 = (process.env.API1_URL || "http://localhost:8080").replace(/\/+$/, "");
  const API2 = (process.env.API2_URL || "http://localhost:8000").replace(/\/+$/, "");

  // Cambiado a /users
  const [usersResp, booksResp] = await Promise.all([
    axios.get(`${API1}/users`),
    axios.get(`${API2}/books`)
  ]);

  const userIds = usersResp.data.map(u => String(u.id));
  const bookIds = booksResp.data.map(b => String(b.id));
  console.log(`ℹ️  Encontrados ${userIds.length} users y ${bookIds.length} books`);

  // 4) Insertar 20k préstamos en batches
  const batchSize = 1000;
  const batch = [];
  for (let i = 1; i <= 20000; i++) {
    const user_id = userIds[Math.floor(Math.random() * userIds.length)];
    const book_id = bookIds[Math.floor(Math.random() * bookIds.length)];
    batch.push({
      user_id,
      book_id,
      loan_date: new Date(),
      return_date: new Date(Date.now() + 7 * 24 * 3600 * 1000),
      status: "active"
    });

    if (batch.length === batchSize) {
      await Loan.insertMany(batch);
      process.stdout.write(`Inserted ${i} loans\r`);
      batch.length = 0;
    }
  }
  if (batch.length) {
    await Loan.insertMany(batch);
  }
  console.log("\n✅ Seed completo: 20 000 préstamos insertados");

  // 5) Desconectar
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error("Error en seed:", err);
  process.exit(1);
});
