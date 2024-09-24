const multer = require('multer');
const path = require('path');
const Report = require('../models/Report');
const asyncHandler = require('express-async-handler');

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads')); // Correctly resolve 'uploads/' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to file
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size: 10MB
});

// @desc    Create a new report
// @route   POST /api/reports
// @access  Private
const createReport = asyncHandler(async (req, res) => {
  const { department, zone, bureau, problemType, description, reported_id, username, phone } = req.body;
  const attachments = req.files ? req.files.map(file => file.path) : [];

  const report = await Report.create({
    reported_id,
    username,
    phone,
    department,
    zone,
    bureau,
    problemType,
    description,
    attachments
  });

  if (report) {
    res.status(201).json(report);
  } else {
    res.status(400);
    throw new Error('Invalid report data');
  }
});

// @desc    Get all reports
// @route   GET /api/reports
// @access  Private
const getAllReports = async (req, res) => {
  try {
    // Fetch all reports from the database
    const reports = await Report.find().populate('reported_id', 'username phone'); // Adjust fields as needed

    if (!reports || reports.length === 0) {
      return res.status(404).json({ message: 'No reports found' });
    }

    // Send the reports as JSON
    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    // Handle errors and send a response
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'Server error', error });
  }
}

module.exports = {
  createReport,
  getAllReports,
  upload
};
