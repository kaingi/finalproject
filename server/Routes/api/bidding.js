const express = require('express');
const router = express.Router();
const biddingController = require('../../controllers/biddingController');

router.route('/')
    .post(biddingController.addnewbid)
    .get(biddingController.getAllBids)


module.exports = router;