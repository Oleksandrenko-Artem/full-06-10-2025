const express = require('express');
const { registerSchema } = require('../validators/user.validator');
const { registerUser } = require('../controllers/user.controller');
const { validate } = require('../middlewares/validate.mw');

const router = express.Router();

router.post('/register', validate(registerSchema), registerUser);

module.exports = router;