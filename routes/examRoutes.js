// routes/examRoutes.js

const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

// Get all exams
router.get('/exams', examController.getAllExams);

// Get exam by ID
router.get('/exams/:id', examController.getExamById);

// Create new exam
router.post('/exams', examController.createExam);

// Update exam
router.put('/exams/:id', examController.updateExam);

// Delete exam
router.delete('/exams/:id', examController.deleteExam);

module.exports = router;
