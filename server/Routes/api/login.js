const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/loginController');

router.route('/')
    .post(loginController.ValidateUser)
    
    /* .put(buyerController.updateBuyer)
    .delete(buyerController.deleteBuyer) */



module.exports = router;