const express = require('express');
const router = express.Router();
const user_data = require("../controllers/user_data.controller.js");

router.get('/:user_id', user_data.getById);

router.post('/:user_id', user_data.updateById);

module.exports = router;