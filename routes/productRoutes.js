// routes/products.js
const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const upload = require('../config/multer-config'); // Adjust the path as needed

router.post('/products', upload.single('image'), productController.createProduct);
router.put('/products/:id', upload.single('image'), productController.updateProduct);
router.get('/products', productController.getProducts);
router.get('/products/new', (req, res) => res.render('products/create'));
router.get('/products/:id', productController.getProduct);
router.get('/products/:id/edit', productController.editProduct);
router.post('/products/:id/delete', productController.deleteProduct);

module.exports = router;
