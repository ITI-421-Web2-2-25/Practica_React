import express from 'express';
import connectDB from '../src/config/dbContext.js';
import categoryRoutes from '../src/routes/categoryRoutes.js';
import userRoutes from '../src/routes/userRoutes.js';
import Roles from '../src/models/rols.js'
import apiLimiter from '../src/middleware/rateLimiter.js'

const app = express();
connectDB();
initial();

// Middlewares

// Limitar el tamaño del Payload o carga útil de solicitud
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// Rate Limiter Limitar la cantidad de solicitudes entrantes (rae limit)
app.use("/api", apiLimiter);

// Rutas
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);

// Create the initial roles if they do not exist
async function initial() {
    await Roles.estimatedDocumentCount().then((count) => {
        if (count === 0) {
            const newRoles = [
                {
                    name: "root",
                    level: 1,
                    description: "Rol superior, soporte global"
                },
                {
                    name: "admin",
                    level: 3,
                    description: "Rol administrativo, acceso parcial actualizaciones/consultas"
                },
                {
                    name: "user",
                    level: 5,
                    description: "Usuario normal, acceso parcial consultas"
                },
                {
                    name: "guest",
                    level: 7,
                    description: "Invitado, solo ciertas consultas"
                }];

            Roles.insertMany(newRoles).then(() => {
                console.log("Roles agregados");
            }).catch(err => {
                console.log("error", err);
            });
        }
    });
}

export default app;