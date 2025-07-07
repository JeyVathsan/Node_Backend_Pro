// routes/marksRoutes.js
const express = require('express');
const router = express.Router();
const marksController = require('../controllers/marksController');

// Create Marks
router.post('/marks', marksController.createMarks);

// Get All Marks
router.get('/marks', marksController.getAllMarks);

// Get Marks by Student ID
router.get('/marks/student/:studentId', marksController.getMarksByStudentId);

// Update Marks
router.put('/marks/:id', marksController.updateMarks);

// Delete Marks
router.delete('/marks/:id', marksController.deleteMarks);

module.exports = router;
