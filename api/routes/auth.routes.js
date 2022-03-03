const express = require('express');
const router = express.Router();
const auth = require("../controllers/auth.controller.js");
const preRegistrationCheck = require('../middleware/payload_verification/pre-registration');

router.post('/login', auth.login);

router.post('/refresh_login', auth.refreshLogin);

router.post('/register', preRegistrationCheck, auth.register);


module.exports = router;