const express = require('express');
const router = express.Router();
const { createReport, getAllReports, upload } = require('../controllers/reportController');

// Route to create a new report with file upload
router.post('/', upload.array('attachments', 5), createReport);

// Route to get all reports
router.get('/', getAllReports);

module.exports = router;
