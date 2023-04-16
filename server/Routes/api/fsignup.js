const express = require('express');
const router = express.Router();
const FarmerController = require('../../controllers/fsignupController');

router.route('/')
    .post(FarmerController.addNewFarmer)
    
    /* .put(buyerController.updateBuyer)
    .delete(buyerController.deleteBuyer) */



module.exports = router;