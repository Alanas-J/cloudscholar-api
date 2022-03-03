const express = require('express');
const router = express.Router();
const user_data = require("../controllers/user_data.controller.js");

// Future: Check if authenticated and query matches ID in token.
router.get('/:id', user_data.getById);

router.post('/:id', user_data.updateById);


module.exports = router;