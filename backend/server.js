const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const noteRoutes = require("./src/routes/noteRoutes");

const app = express();

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas básicas
app.get("/", (req, res) => {
  res.json({ mensaje: "Bienvenido al backend de Notebook NM" });
});

app.get("/status", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Rutas de notas
app.use("/api/notes", noteRoutes);

// Puerto
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
