// routes/subjectRoutes.js
const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

// Create a new subject
router.post('/', subjectController.createSubjects);

// Get all subjects
router.get('/', subjectController.getAllSubjects);

// Get subject by ID
router.get('/students/:id', subjectController.getSubjectById);

// Update a subject by ID
router.put('/update', subjectController.updateSubjects);

// Delete a subject by ID
router.delete('/:id', subjectController.deleteSubject);

module.exports = router;
