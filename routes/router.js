import express from 'express';
import Auth from '../controllers/UsersController.js';
import Product from '../controllers/ProductController.js';
import Stores from '../controllers/ProfileController.js';
import Settings from '../controllers/SettingController.js';
import jwtAuth from '../middlewares/jwtAuth.js';

const router = express.Router();

router.get('/', jwtAuth(), (req, res) => {
  res.status(200).json({
    message: 'Selamat Datang di API Logitory!!!'
  });
});

// AUTH endpoint
router.post('/auth/register', Auth.Register);
router.post('/auth/login', Auth.Login);
router.post('/auth/refresh-token', Auth.refreshToken);
router.post('/auth/forget-password', Auth.forgetPassword);

// PROFILE endpoint
router.get('/profile', jwtAuth(), Stores.getProfile);
router.put('/profile/edit_profile', jwtAuth(), Stores.updateProfile);

// SETTING endpoint
router.get('/setting', jwtAuth(), Settings.getStoreSetting);

// ITEM MANAGEMENT endpoint
router.get('/product/product_available', jwtAuth(), Product.productAvailable);
router.get('/product/product_almost_out', jwtAuth(), Product.productAlmostOut);
router.get('/product/product_expired', jwtAuth(), Product.productExpired);
router.get('/product/product_sold_out', jwtAuth(), Product.productSoldOut);

export default router;