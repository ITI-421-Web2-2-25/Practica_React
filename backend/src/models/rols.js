import mongoose from "mongoose";

const RolSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        level: { type: Number, required: true },
        description: { type: String, required: true }
    }
);

export default mongoose.model("Rol", RolSchema);