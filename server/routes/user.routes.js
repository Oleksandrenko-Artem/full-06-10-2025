const express = require('express');
const { registerSchema, loginSchema } = require('../validators/user.validator');
const { registerUser, loginUser, getAccount, getAllUsers } = require('../controllers/user.controller');
const { validate } = require('../middlewares/validate.mw');
const { auth, isAdmin } = require('../middlewares/auth.mw');

const router = express.Router();

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);
router.get('/account', auth, getAccount);
router.get('/', auth, isAdmin, getAllUsers);

module.exports = router;