// controllers/marksController.js
const Marks = require('../models/marks');


const createMarks = (req, res) => {
    const { student_id, exam_id, marks } = req.body;

    // Validate input
    if (!student_id || !exam_id || !Array.isArray(marks) || marks.length === 0) {
        return res.status(400).json({ error: 'Student ID, Exam ID, and Marks array are required' });
    }

    // Prepare bulk insert data
    const values = marks.map(mark => [student_id, exam_id, mark.subject_id, mark.marks_obtained]);

    Marks.createMultipleMarks(values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }
        res.status(201).json({ message: 'Marks added successfully', data: result });
    });
};



// Get All Marks
const getAllMarks = (req, res) => {
  Marks.getAllMarks((err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching marks' });
    } else {
      res.status(200).json({ data: result });
    }
  });
};

// Get Marks by Student ID
const getMarksByStudentId = (req, res) => {
  const studentId = req.params.studentId;

  Marks.getMarksByStudentId(studentId, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching student marks' });
    } else {
      res.status(200).json({ data: result });
    }
  });
};

// Update Marks

const updateMarks = (req, res) => {
    const { student_id, exam_id, marks } = req.body;

    // Validate input
    if (!student_id || !exam_id || !Array.isArray(marks) || marks.length === 0) {
        return res.status(400).json({ error: 'Student ID, Exam ID, and Marks array are required' });
    }

    // Prepare update queries for each subject
    const updateQueries = marks.map(mark => [
        mark.marks_obtained, // New marks
        student_id,          // Student ID
        exam_id,             // Exam ID
        mark.subject_id      // Subject ID
    ]);

    Marks.updateMultipleMarks(updateQueries, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }
        res.status(200).json({ message: 'Marks updated successfully', data: result });
    });
};




// Delete Marks
const deleteMarks = (req, res) => {
  const { id } = req.params;

  Marks.deleteMarks(id, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error deleting marks' });
    } else {
      res.status(200).json({ message: 'Marks deleted successfully', data: result });
    }
  });
};

module.exports = { createMarks, getAllMarks, getMarksByStudentId, updateMarks, deleteMarks };
