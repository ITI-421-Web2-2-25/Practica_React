import mongoose from "mongoose";

const contextDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/northwind_kgpa", { });
    console.log("Conexión base de datos exitosa...");
  } catch (err) {
    console.error("Error no se puede conectar con la base de datos:", err.message);
    process.exit(1);
  }
};

export default contextDB;