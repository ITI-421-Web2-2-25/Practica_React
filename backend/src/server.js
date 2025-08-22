import cors from 'cors';
import cookieSession from "cookie-session";
import helmet from "helmet";

import app from "./app.js";

// Set up CORS options
var corsOptions = {
    origin: "http://localhost:5010",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Enable CORS, Cross-Origin Resource Sharing, to allow API to be accessed by web pages,
// and other web origins. This is a security feature to prevent unauthorized access.
app.use(cors(corsOptions));

// Enable Helmet, a collection of 14 smaller middleware functions that set HTTP headers
// to secure the application
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],                // Solo mismo dominio
            scriptSrc: ["'self'"],                 // Solo scripts cargados desde tu dominio
            styleSrc: ["'self'", "https://fonts.googleapis.com"], // Sin inline
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:"],           // Permitir imágenes locales y base64
            connectSrc: ["'self'", "http://localhost:5000"], // Solo API backend
            objectSrc: ["'none'"],                 // Bloquea <object>, <embed>, <applet>
            frameAncestors: ["'none'"],            // Nadie puede hacer iframe de tu app
            formAction: ["'self'"],                // Formularios solo a tu dominio
            baseUri: ["'self'"],                   // Bloquea <base> manipulaciones
            upgradeInsecureRequests: [],           // Fuerza HTTPS en prod
        },
    })
);

// Add cookie session
var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
app.use(
    cookieSession({
        name: "demoyork-session",
        secret: "COOKIE_SECRET", // should use as secret environment variable
        httpOnly: true,
        expires: expiryDate
    })
);

// Set request and response timeout
app.use((req, res, next) => {
    req.setTimeout(5000); // Set request timeout to 5 seconds
    res.setTimeout(5000); // Set response timeout to 5 seconds
    next();
});

// Enable headers for CORS
app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
    );
    next();
});

app.get("/", (req, res) => {
    const msgJson = {
        status_code: 200,
        status_message: "OK",
        body_message: "Bienvinido a la aplicación. Desarrollador Kevin Picado"
    };
    res.status(200).json(msgJson);
});

const PORT = 5000;
const server = app.listen(PORT, () => {
    console.log(`API Server en http://localhost:${PORT}`);
});

// Set up the server with keep-alive and headers timeout
server.keepAliveTimeout = 30 * 1000; // 30 seconds
server.headersTimeout = 35 * 1000; // 35 seconds