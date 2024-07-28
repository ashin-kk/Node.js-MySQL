// module for user Routes
const express = require('express');
const router = express.Router();

const { identifyContact } = require('../controller');
router.post('/identify', identifyContact);

module.exports = router;
