const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Obtener el token del header Authorization
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;  // Guarda el ID del usuario en la request
    next();  // Continúa a la siguiente función
  } catch (error) {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
};

module.exports = authMiddleware;
