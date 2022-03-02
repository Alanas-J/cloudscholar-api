const express = require('express');
const router = express.Router();
const auth = require("../controllers/auth.controller.js");

router.post('/login', auth.login);

router.post('/refresh_login', auth.refreshLogin);

router.post('/signup', auth.signup);


module.exports = router;