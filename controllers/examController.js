// controllers/examController.js

const examModel = require('../models/exam');

// Get all exams
exports.getAllExams = (req, res) => {
    examModel.getAllExams()
        .then(exams => res.json(exams))
        .catch(err => res.status(500).json({ error: err }));
};

// Get exam by ID
exports.getExamById = (req, res) => {
    const { id } = req.params;
    examModel.getExamById(id)
        .then(exam => {
            if (!exam) {
                return res.status(404).json({ error: 'Exam not found' });
            }
            res.json(exam);
        })
        .catch(err => res.status(500).json({ error: err }));
};

// Create new exam
exports.createExam = (req, res) => {
    const { exam_name, exam_date } = req.body;
    examModel.createExam(exam_name, exam_date)
        .then(examId => res.status(201).json({ id: examId, message: 'Exam created successfully' }))
        .catch(err => res.status(500).json({ error: err }));
};

// Update exam
exports.updateExam = (req, res) => {
    const { id } = req.params;
    const { exam_name, exam_date } = req.body;
    examModel.updateExam(id, exam_name, exam_date)
        .then(result => {
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Exam not found' });
            }
            res.json({ message: 'Exam updated successfully' });
        })
        .catch(err => res.status(500).json({ error: err }));
};

// Delete exam
exports.deleteExam = (req, res) => {
    const { id } = req.params;
    examModel.deleteExam(id)
        .then(result => {
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Exam not found' });
            }
            res.json({ message: 'Exam deleted successfully' });
        })
        .catch(err => res.status(500).json({ error: err }));
};

