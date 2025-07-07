// routes/studentRoutes.js

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Route to get all students
router.get('/students', studentController.getAllStudents);

// Route to get student by ID
router.get('/students/:id', studentController.getStudentById);

// Route to create a new student
router.post('/students', studentController.createStudent);

// Route to update student
router.put('/students/:id', studentController.updateStudent);

// Route to delete student
router.delete('/students/:id', studentController.deleteStudent);

module.exports = router;
