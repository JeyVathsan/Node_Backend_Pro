

const studentModel = require('../models/student');
const db = require('../config/db');  // Add this line


// Get all students
exports.getAllStudents = (req, res) => {
    studentModel.getAllStudents()
        .then(students => {
            res.json(students);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch students' });
        });
};

// Get student by ID
exports.getStudentById = (req, res) => {
    const { id } = req.params;
    studentModel.getStudentById(id)
        .then(student => {
            if (!student) {
                return res.status(404).json({ error: 'Student not found' });
            }
            res.json(student);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch student' });
        });
};

// Create a new student
exports.createStudent = (req, res) => {
    const { name, email, dob, studentClass, section } = req.body; // Changed 'class' to 'studentClass'
    studentModel.createStudent(name, email, dob, studentClass, section)
        .then(insertId => {
            res.status(201).json({ message: 'Student added successfully', id: insertId });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Failed to add student' });
        });
};

// Update student
exports.updateStudent = (req, res) => {
    const { id } = req.params;
    const { name, email, dob, studentClass, section } = req.body; // Changed 'class' to 'studentClass'
    studentModel.updateStudent(id, name, email, dob, studentClass, section)
        .then(result => {
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Student not found' });
            }
            res.json({ message: 'Student updated successfully' });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Failed to update student' });
        });
};

// Delete student
// Delete student
exports.deleteStudent = (req, res) => {
  const { id } = req.params; // Get the student ID from the URL

  const query = 'DELETE FROM students WHERE id = ?';

  db.query(query, [id], (err, results) => {
      if (err) {
          console.error('Error deleting student:', err);
          return res.status(500).json({ error: 'Failed to delete student' });
      }
      if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Student not found' });
      }
      res.json({ message: 'Student deleted successfully' });
  });
};
