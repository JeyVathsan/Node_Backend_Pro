// models/subject.js
const mysql = require('mysql');
const db = require('../config/db');

// Create Subject

const createSubjects = (student_id, exam_id, subjects, result) => {
  // Prepare the SQL query for inserting multiple rows at once
  const query = 'INSERT INTO subjects (student_id, exam_id, subject_name, total_marks, pass_mark) VALUES ?';

  // Prepare the values array in the required format for bulk insert
  const values = subjects.map(subject => [
    student_id,
    exam_id,
    subject.subject_name,
    subject.total_marks,
    subject.pass_mark
  ]);

  db.query(query, [values], (err, res) => {
    if (err) {
      console.log('Error:', err);
      result(err, null); // Return error if any
    } else {
      console.log('Subjects created:', res);
      result(null, res); // Return the result if successful
    }
  });
};






// Get all Subjects
const getAllSubjects = (result) => {
  db.query(`SELECT * FROM subjects;
`, (err, res) => {
    if (err) {
      console.log('Error:', err);
      result(null, err);
    } else {
      console.log('Subjects:', res);
      result(null, res);
    }
  });
};

// Get Subject by ID
const getSubjectById = (id, result) => {
  db.query(`SELECT * FROM subjects WHERE id = ?`, [id], (err, res) => {
    if (err) {
      console.log('Error:', err);
      result(null, err);
    } else {
      console.log('Subject found:', res);
      result(null, res);
    }
  });
};


// Update Subject


// Update subjects for a student
const updateSubjects = (student_id, exam_id, subjects) => {
  const updatePromises = subjects.map(subject => {
    const query = `
      UPDATE subjects
      SET total_marks = ?, pass_mark = ?
      WHERE student_id = ? AND exam_id = ? AND subject_name = ?
    `;
    
    return new Promise((resolve, reject) => {
      db.query(query, [subject.total_marks, subject.pass_mark, student_id, exam_id, subject.subject_name], (err, res) => {
        if (err) {
          return reject('Error updating subject ' + subject.subject_name);
        }
        resolve(res);
      });
    });
  });

  return Promise.all(updatePromises);
};










// Delete Subject
const deleteSubject = (id, result) => {
  db.query('DELETE FROM subjects WHERE student_id = ?', [id], (err, res) => {
    if (err) {
      console.log('Error:', err);
      result(null, err);
    } else {
      console.log('Subject deleted:', res);
      result(null, res);
    }
  });
};

module.exports = { createSubjects, getAllSubjects, getSubjectById, deleteSubject, updateSubjects };
