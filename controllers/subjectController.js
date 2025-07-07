// controllers/subjectController.js
const subjectModel = require('../models/subject');

// Create Subject
const db=require('../config/db')



// Create subjects for a student in an exam
const createSubjects = (req, res) => {
  const { student_id, exam_id, subjects } = req.body;

  // Check if all required fields are provided
  if (!student_id || !exam_id || !Array.isArray(subjects) || subjects.length === 0) {
    return res.status(400).json({ message: 'Please provide valid data for student_id, exam_id, and subjects' });
  }

  // Check if each subject has the necessary fields
  for (let subject of subjects) {
    if (!subject.subject_name || subject.total_marks === undefined || subject.pass_mark === undefined) {
      return res.status(400).json({ message: 'Missing required fields in subjects' });
    }
  }

  // Call the model function to insert subjects into the database
  subjectModel.createSubjects(student_id, exam_id, subjects, (err, result) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ message: 'Internal Server Error', error: err });
    }
    return res.status(201).json({ message: 'Subjects created successfully', result });
  });
};


const updateSubjects = async (req, res) => {
  const { student_id, exam_id, subjects } = req.body;

  try {
    const result = await subjectModel.updateSubjects(student_id, exam_id, subjects);
    res.status(200).json({ message: 'Subjects updated successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error updating subjects', error });
  }
};







const getAllSubjects = (req, res) => {
  subjectModel.getAllSubjects((err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving subjects', error: err });
    }
    res.status(200).json(result);
  });
};

const getSubjectById = (req, res) => {
  const subjectId = req.params.id;
  subjectModel.getSubjectById(subjectId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving subject', error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.status(200).json(result);
  });
};



const deleteSubject = (req, res) => {
  const subjectId = req.params.id;
  subjectModel.deleteSubject(subjectId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting subject', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.status(200).json({ message: 'Subject deleted successfully', data: result });
  });
};

module.exports = { createSubjects,  updateSubjects, getAllSubjects, getSubjectById,  deleteSubject };
