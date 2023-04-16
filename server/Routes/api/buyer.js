const express = require('express');
const router = express.Router();
const buyerController = require('../../controllers/buyerController');

router.route('/')
    .get(buyerController.getAllBuyer)
    .post(buyerController.addNewBuyer)



module.exports = router;