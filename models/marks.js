// models/marks.js
const db = require('../config/db');


// Bulk insert marks
const createMultipleMarks = (marksArray, result) => {
    const query = 'INSERT INTO marks (student_id, exam_id, subject_id, marks_obtained) VALUES ?';
    db.query(query, [marksArray], (err, res) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
        } else {
            console.log('Marks added:', res);
            result(null, res);
        }
    });
};


// Get all Marks
const getAllMarks = (result) => {
  const query = `
    SELECT 
        m.id,
        m.student_id,
        s.name AS student_name,
        m.exam_id,
        sub.subject_name,
        m.marks_obtained
    FROM marks m
    JOIN students s ON m.student_id = s.id
    JOIN subjects sub ON m.subject_id = sub.id
    ORDER BY m.student_id, m.exam_id, sub.id;
  `;
  db.query(query, (err, res) => {
    if (err) {
      console.log('Error:', err);
      result(err, null);
    } else {
      console.log('Marks:', res);
      result(null, res);
    }
  });
};

// Get Marks by Student ID
const getMarksByStudentId = (studentId, result) => {
  const query = `
    SELECT 
        m.id,
        m.student_id,
        s.name AS student_name,
        m.exam_id,
        sub.subject_name,
        m.marks_obtained
    FROM marks m
    JOIN students s ON m.student_id = s.id
    JOIN subjects sub ON m.subject_id = sub.id
    WHERE m.student_id = ?
    ORDER BY m.exam_id, sub.id;
  `;
  db.query(query, [studentId], (err, res) => {
    if (err) {
      console.log('Error:', err);
      result(err, null);
    } else {
      console.log('Marks for student:', res);
      result(null, res);
    }
  });
};

// Update Marks

// Bulk update marks
const updateMultipleMarks = (marksArray, result) => {
    const query = `
        UPDATE marks
        SET marks_obtained = ?
        WHERE student_id = ? AND exam_id = ? AND subject_id = ?
    `;

    // Execute each update for every subject
    let promises = marksArray.map(mark => {
        return new Promise((resolve, reject) => {
            db.query(query, mark, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    });

    // Wait for all updates to finish
    Promise.all(promises)
        .then(results => result(null, results))
        .catch(error => result(error, null));
};



// Delete Marks
const deleteMarks = (id, result) => {
  const query = 'DELETE FROM marks WHERE id = ?';
  db.query(query, [id], (err, res) => {
    if (err) {
      console.log('Error:', err);
      result(err, null);
    } else {
      console.log('Marks deleted:', res);
      result(null, res);
    }
  });
};

module.exports = { createMultipleMarks, getAllMarks, getMarksByStudentId, updateMultipleMarks, deleteMarks };
