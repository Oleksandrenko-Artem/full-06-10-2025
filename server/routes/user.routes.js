const express = require('express');
const { registerSchema, loginSchema } = require('../validators/user.validator');
const { registerUser, loginUser } = require('../controllers/user.controller');
const { validate } = require('../middlewares/validate.mw');

const router = express.Router();

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);

module.exports = router;