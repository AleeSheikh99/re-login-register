import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';

// public route

router.post('/register', userController.UserRegistration)
router.post('/login', userController.UserLogin)
//routes

export default router

