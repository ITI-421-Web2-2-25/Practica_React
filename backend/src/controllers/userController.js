import mongoose from 'mongoose';

// Import the secret key and the jsonwebtoken objects
import secret from '../config/secretContext.js';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import Users from "../models/user.js";

// Create the signup function
export const signup = async (req, res, next) => {
    const user = new Users({
        fullname: req.body.fullname,
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
        rol: req.body.rol
    });

    await Users.insertOne(user).then(() => {
        const msgJson = {
            status_code: 200,
            status_message: 'OK',
            body_message: 'Usuario registrado exitosamente!'
        };
        res.status(200).json(msgJson);
    }).catch(err => {
        console.log('error', err);
        const msgJson = {
            status_code: 500,
            status_message: 'Server error',
            body_message: err
        };
        res.status(500).json(msgJson);
    });
}

// Create the signin function
export const signin = async (req, res) => {
    await Users.findOne({username: req.body.username}).then((user) => {
        if (!user) {
            const msgJson = {
                status_code: 404,
                status_message: 'No encontrado',
                body_message: 'El usuario no existe!'
            };

            return res.status(404).send(msgJson);
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            const msgJson = {
                status_code: 401,
                status_message: 'Unauthorized',
                body_message: 'El usuario o contraseña son incorrectos!'
            };
            res.status(401).json(msgJson);
        }

        var token = jsonwebtoken.sign({ id: user._id }, secret, {
            expiresIn: 86400, // 24 hours (60 secs * 60 mins * 24 hrs)
        });

        var nivel = user.rol.toUpperCase();

        req.session.token = token;

        const msgJson = {
            status_code: 200,
            status_message: 'Ok',
            body_message: {
                id: user._id,
                username: user.username,
                email: user.email,
                roles: nivel
            }
        };

        res.status(200).send(msgJson);
    }).catch(err => {
        const msgJson = {
            status_code: 500,
            status_message: 'Internal Server Error',
            body_message: err
        };
        res.status(500).send(msgJson);
    })
};

// Create the signout function
export const signout = async (req, res) => {
    try {
        req.session = null;
        const msgJson = {
            status_code: 200,
            status_message: 'OK',
            body_message: 'El usuario se deslogueo!'
        };
        res.status(200).json(msgJson);
    } catch (err) {
        this.next(err);
    }
};
