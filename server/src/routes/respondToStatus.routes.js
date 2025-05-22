const express = require('express');
const router = express.Router();
const { isLoggedIn, isDoctor } = require('../validations/authValidator');
const { respondToStatus } = require('../controllers/respondToStatus.controller');

router.post('/:statusId', isLoggedIn, isDoctor, respondToStatus);

module.exports = router;

