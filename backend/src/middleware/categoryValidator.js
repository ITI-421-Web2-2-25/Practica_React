import { body, validationResult } from "express-validator";

export const validateCategory = [
  body("CategoryID")
    .isString().withMessage("CategoryID debe ser texto")
    .isLength({ min: 1, max: 20 }).withMessage("CategoryID debe tener entre 1 y 20 caracteres"),

  body("CategoryName")
    .isString().withMessage("CategoryName debe ser texto")
    .isLength({ min: 1, max: 50 }).withMessage("CategoryName debe tener entre 1 y 50 caracteres"),

  body("Description")
    .optional()
    .isString().withMessage("Description debe ser texto")
    .isLength({ max: 200 }).withMessage("Description no puede exceder 200 caracteres"),

  body("Mime")
    .optional()
    .isIn(["image/png", "image/jpeg", "image/jpg", "image/gif"])
    .withMessage("Mime debe ser un tipo de imagen válido"),

  // Middleware para manejar los errores
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  }
];