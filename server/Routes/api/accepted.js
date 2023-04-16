const express = require('express');
const router = express.Router();
const AcceptedController = require('../../controllers/acceptedbidController');

router.route('/')
    .post(AcceptedController.addNewBid)
    .get(AcceptedController.getAllaccepted)


module.exports = router;