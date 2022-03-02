const express = require('express');
const router = express.Router();
const user_data = require("../controllers/tutorial.controller.js");

router.get('/:user_id', user_data.getById);

router.post('/:user_id', user_data.updateById);

module.exports = router;