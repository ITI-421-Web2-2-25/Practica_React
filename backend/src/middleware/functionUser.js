import mongoose from 'mongoose';

// Import the secret key and the jsonwebtoken objects
import secret from '../config/secretContext.js';
import jsonwebtoken from 'jsonwebtoken';

// Creates the roles array
const ROLES = ['root', 'admin', 'user', 'guest'];

// Creates the database variable
const Users = mongoose.model('User');

// Create the verifyToken function
export const verifyToken = (req, res, next) => {
    let token = req.session.token;
    if (!token) {
        const msgJson = {
            status_code: 403,
            status_message: 'Forbidden',
            body_message: 'El usuario no tiene permisos para ingresar, por favor inicie sesión.'
        };
        return res.status(403).send(msgJson);
    }

    jsonwebtoken.verify(token, secret, (err, decoded) => {
        if (err) {
            const msgJson = {
                status_code: 401,
                status_message: 'Unauthorized',
                body_message: 'El usuario no está autorizado.'
            };
            return res.status(401).send(msgJson);
        }
        req.UserID = decoded.id;
        next();
    });
};

export const verifyRol = (req, res, next) => {
    if (req.body.rol) {
        if (!ROLES.includes(req.body.rol)) {
            const msgJson = {
                status_code: 400,
                status_message: 'Bad request',
                body_message: 'El rol no existe.'
            };
            return res.status(400).send(msgJson);
        }
    }
    next();
};

// Create the verifyDuplicates (username & eMail) function
export const verifyDuplicates = async (req, res, next)  => {
    let msgJson = {};
    // Username validation
    await Users.findOne({username: req.body.username}).then(user =>{
        if (user) {
            msgJson = {
                status_code: 400,
                status_message: 'Bad request',
                body_message: 'Error! El usuario está en uso!'
            };
        }
    }).catch(err => {
        msgJson = {
            status_code: 500,
            status_message: 'Internal server error',
            body_message: err
        };
    });

    if (!msgJson.status_code) {
        // Email validation
        await Users.findOne({email: req.body.email}).then(user => {
            if (user) {
                const msgJson = {
                    status_code: 400,
                    status_message: 'Bad request',
                    body_message: 'Error! El correo está en uso!'
                };
            }
        }).catch(err => {
            const msgJson = {
                status_code: 500,
                status_message: 'Internal server error',
                body_message: err
            };
        });
    }
    if (msgJson.status_code) {
        return res.status(msgJson.status_code).send(msgJson);
    }
    next();
};

export const isAdmin = async (req, res, next) => {
    let msgJson = {};
    await Users.findById(req.UserID).then(user => {
        if (user.rol === 'admin') {
            console.log(user);
            next();
            return;
        }
        msgJson = {
            status_code: 403,
            status_message: 'Forbidden',
            body_message: 'El usuario no tiene permisos.'
        };
    }).catch(err => {
        msgJson = {
            status_code: 500,
            status_message: 'Internal Server Error',
            body_message: err
        };
    });
    if (msgJson.status_code) {
        return res.status(msgJson.status_code).send(msgJson);
    }
};

export const isUser = async (req, res, next) => {
    let msgJson = {};
    await Users.findById(req.UserID).then(user => {
        if (user.rol === 'user') {
            next();
            return;
        }
        msgJson = {
            status_code: 403,
            status_message: 'Forbidden',
            body_message: 'El usuario no tiene permisos.'
        };
    }).catch(err => {
        msgJson = {
            status_code: 500,
            status_message: 'Internal Server Error',
            body_message: err
        };
    });
    if (msgJson.status_code) {
        return res.status(msgJson.status_code).send(msgJson);
    }
};
