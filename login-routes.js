const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

// Array de usuarios predefinidos
const users = [
  { username: "admin", password: "password1" },
  { username: "user", password: "password2" },
];

// Ruta de login para autenticación y generación del token JWT
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Verificar si las credenciales son válidas
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  // Generar el token JWT
  const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({ message: "Bienvenido", token });
});

// Ruta protegida que valida el token JWT
router.get("/protected", (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    res.json({ message: "Token is valid", username: decoded.username });
  });
});

module.exports = router;