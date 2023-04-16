const express = require('express');
const router = express.Router();
const cooperativeController = require('../../controllers/cooperativeController');

router.route('/')
    .post(cooperativeController.addNewCooperative)
    .get(cooperativeController.getCooperative)
module.exports = router;