import express from 'express';
import { signup, signin, signout } from '../controllers/userController.js';
import { verifyRol, verifyDuplicates } from '../middleware/functionUser.js';

const users = express.Router();

users.post("/signup", [verifyDuplicates, verifyRol],  signup);
users.post("/signin", signin);
users.post("/signout", signout);

export default users;