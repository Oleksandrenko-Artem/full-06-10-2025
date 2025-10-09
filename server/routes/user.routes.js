const express = require('express');
const { registerSchema, loginSchema } = require('../validators/user.validator');
const { registerUser, loginUser, getAccount } = require('../controllers/user.controller');
const { validate } = require('../middlewares/validate.mw');
const { auth } = require('../middlewares/auth.mw');

const router = express.Router();

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);
router.get('/account', auth, getAccount);

module.exports = router;