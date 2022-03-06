const express = require('express');
const router = express.Router();
const user_data = require("../controllers/user_data.controller.js");
const check_auth_jwt = require('../middleware/authentication/check_auth_jwt.js');

// Uses JWT to identify which user to fetch.
router.get('', check_auth_jwt, user_data.get);
router.post('', check_auth_jwt, user_data.update);

// Routes for development
router.get('/:id', user_data.getById);
router.post('/:id', user_data.updateById);


module.exports = router;