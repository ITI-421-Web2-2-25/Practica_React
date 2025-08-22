import Category from "../models/category.js";

// Crear categoría
export const createCategory = async (req, res) => {
  try {
    const { CategoryID, CategoryName, Description, Mime } = req.body;
    const Image = req.file ? req.file.buffer : null;

    if (!Image) {
      return res.status(400).json({ error: "Image is required" });
    }

    const newCategory = new Category({
      CategoryID,
      CategoryName,
      Description,
      Mime,
      Image
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lista de categorías
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};