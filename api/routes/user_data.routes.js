const express = require('express');
const router = express.Router();
const user_data = require("../controllers/user_data.controller.js");
const process_auth_jwt = require('../middleware/authentication/process_auth_jwt.js');

// Uses JWT to identify which user to fetch.
router.get('', process_auth_jwt, user_data.get);
router.post('', process_auth_jwt, user_data.update);

// Routes for development
router.get('/:id', user_data.getById);
router.post('/:id', user_data.updateById);


module.exports = router;