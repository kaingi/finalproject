const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productsController');

router.route('/')
    .get(productController.getAllProducts)
    /* .delete(productController.removeProduct) */

    
module.exports = router;


