const express = require('express');
const router = express.Router();
const user_data = require("../controllers/user_data.controller.js");
const checkAuth = require('../middleware/authentication/check-auth.js');

// Uses JWT to identify which user to fetch.
router.get('', checkAuth, user_data.get);
router.post('', checkAuth, user_data.update);

// Routes for development
router.get('/:id', user_data.getById);
router.post('/:id', user_data.updateById);


module.exports = router;