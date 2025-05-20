const express = require('express');
const router = express.Router();
const { isLoggedIn, isDoctor, isPatient } = require('../validations/authValidator');
const {
    createDailyStatus,
    getMyStatuses,
    getStatusesForDoctor
} = require('../controllers/dailyStatus.controller');

// Patient submits daily update
router.post('/', isLoggedIn, createDailyStatus);

// Patient views their records
router.get('/me', isLoggedIn, isPatient, getMyStatuses);

// Doctor views patient records (sorted by severity)
router.get('/doctor', isLoggedIn, isDoctor, getStatusesForDoctor);

module.exports = router;
