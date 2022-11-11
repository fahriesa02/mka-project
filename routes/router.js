import express from 'express';
import Auth from '../controllers/UsersController.js';
import Product from '../controllers/ProductsController.js';
import jwtAuth from '../middlewares/jwtAuth.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Selamat Datang di API Logitory!!!'
    });
});

// AUTH endpoint
router.post('/auth/register', Auth.Register);
router.post('/auth/login', Auth.Login);
router.post('/auth/refresh-token', Auth.refreshToken);

// PRODUCT endpoint
router.get('/product/view_product', jwtAuth(), Product.getProducts);
router.get('/product/view_product/:productName', jwtAuth(), Product.getProductsByName);
router.post('/product/input_product', jwtAuth(), Product.inputProduct);
router.put('/product/update_product/:id', jwtAuth(), Product.updateProduct);
router.delete('/product/delete_product/:productName', jwtAuth(), Product.deleteProduct);


export default router;