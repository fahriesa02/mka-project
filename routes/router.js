import express from 'express';
import Auth from '../controllers/UsersController.js';
import jwtAuth from '../middlewares/jwtAuth.js';

const router = express.Router();

router.get('/', () => {
    res.status(200).json({
        message: 'Selamat Datang di API Logitory!!!'
    });
});

// AUTH endpoint
router.post('/auth/register', Auth.Register);
router.post('/auth/login', Auth.Login);
router.post('/auth/refresh-token', Auth.refreshToken);

// PRODUCT endpoint



export default router;