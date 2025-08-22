import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 solicitudes
  message: {
    error: "Ha excedido el límite de solicitudes al API. Por favor, intente de nuevo más tarde."
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});

export default apiLimiter;