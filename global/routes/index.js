//
// DEFINE ROUTER FOR MODULES

// module for index Router
const express = require('express');
const router = express.Router();

// importing routes
const contacts = require('../../src/contacts/routes');

// initializing routes
router.use('/contact', contacts);

module.exports = router;
