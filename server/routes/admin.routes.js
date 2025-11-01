const express = require('express');
const { getAdminStatistic } = require('../controllers/admin.controller');

const router = express.Router();

router.get('/stats', getAdminStatistic);

module.exports = router;