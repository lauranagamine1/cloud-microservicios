// config/dbClient.js
import mongoose from "mongoose";

const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(queryString);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Conectado a MongoDB con Mongoose");
});

export default mongoose;
