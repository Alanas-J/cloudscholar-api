const express = require('express');
const router = express.Router();
const auth = require("../controllers/auth.controller.js");
const pre_reg_check = require('../middleware/payload_verification/pre_reg_check');
const process_expired_jwt = require('../middleware/authentication/process_expired_jwt');

router.post('/login', auth.login);

router.post('/refresh_token', process_expired_jwt, auth.refresh_token);

router.post('/register', pre_reg_check, auth.register);


module.exports = router;