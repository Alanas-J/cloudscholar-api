const express = require('express');
const router = express.Router();
const user_data = require("../controllers/user_data.controller.js");

router.get('/:id', user_data.getById);

router.post('/:id', user_data.updateById);

router.post('/test/create', user_data.createUserData);

module.exports = router;