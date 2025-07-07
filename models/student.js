// models/student.js

const db = require('../config/db');

// Get all students
exports.getAllStudents = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM students';
        db.query(query, (err, results) => {
            if (err) {
                reject('Error fetching students');
            }
            resolve(results);
        });
    });
};




// Get student by ID
exports.getStudentById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM students WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                reject('Error fetching student');
            }
            resolve(results[0]);
        });
    });
};

// Create a new student
exports.createStudent = (name, email, dob, studentClass, section) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO students (name, email, dob, class, section) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [name, email, dob, studentClass, section], (err, results) => {
            if (err) {
                reject('Error adding student');
            }
            resolve(results.insertId);
        });
    });
};

// Update student
exports.updateStudent = (id, name, email, dob, studentClass, section) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE students 
            SET name = ?, email = ?, dob = ?, class = ?, section = ?
            WHERE id = ?;
        `;
        db.query(query, [name, email, dob, studentClass, section, id], (err, results) => {
            if (err) {
                reject('Error updating student');
            }
            resolve(results);
        });
    });
};

// Delete student
exports.deleteStudent = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM students WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                reject('Error deleting student');
            }
            resolve(results);
        });
    });
};
