const express = require('express');
const router = express.Router();
const auth = require("../controllers/auth.controller.js");
const pre_reg_check = require('../middleware/payload_verification/pre_reg_check');
const check_if_jwt_expired = require('../middleware/authentication/check_if_jwt_expired');

router.post('/login', auth.login);

router.post('/refresh_token', check_if_jwt_expired, auth.refresh_token);

router.post('/register', pre_reg_check, auth.register);


module.exports = router;