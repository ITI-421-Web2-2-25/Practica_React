import express from 'express';
import multer from 'multer';
import { createCategory, getCategories } from '../controllers/categoryController.js';
import { validateCategory } from '../middleware/categoryValidator.js';

const router = express.Router();

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 } // máximo 5MB por archivo
}); 

router.post('/', upload.single('Image'), validateCategory, createCategory);
router.get('/', getCategories);

export default router;