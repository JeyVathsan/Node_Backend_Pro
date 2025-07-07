// models/exam.js

const db = require('../config/db');

// Get all exams
exports.getAllExams = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM exams';
        db.query(query, (err, results) => {
            if (err) {
                reject('Error fetching exams');
            }
            resolve(results);
        });
    });
};

// Get exam by ID
exports.getExamById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM exams WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                reject('Error fetching exam');
            }
            resolve(results[0]);
        });
    });
};

// Create a new exam
exports.createExam = (exam_name, exam_date) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO exams (exam_name, exam_date) VALUES (?, ?)';
        db.query(query, [exam_name, exam_date], (err, results) => {
            if (err) {
                reject('Error adding exam');
            }
            resolve(results.insertId);
        });
    });
};

// Update exam
exports.updateExam = (id, exam_name, exam_date) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE exams 
            SET exam_name = ?, exam_date = ?
            WHERE id = ?;
        `;
        db.query(query, [exam_name, exam_date, id], (err, results) => {
            if (err) {
                reject('Error updating exam');
            }
            resolve(results);
        });
    });
};

// Delete exam
exports.deleteExam = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM exams WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                reject('Error deleting exam');
            }
            resolve(results);
        });
    });
};
