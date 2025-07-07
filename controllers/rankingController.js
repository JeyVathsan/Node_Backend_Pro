const db = require('../config/db');
exports.generateRanking = async (req, res) => {
    try {
        // Step 1: Reset rank variable
        await db.promise().query(`SET @rank := 0`);

        // Step 2: **Clear Old Ranking Data**
        await db.promise().query(`DELETE FROM ranking`);

        // Step 3: Insert fresh ranking data
        await db.promise().query(`
            INSERT INTO ranking (student_id, student_name, exam_id, English, Tamil, Maths, Science, Social, total_marks, status, \`rank\`)
            SELECT 
                st.id AS student_id,
                st.name AS student_name,
                m.exam_id,
                MAX(CASE WHEN sub.subject_name = 'English' THEN m.marks_obtained ELSE 0 END) AS English,
                MAX(CASE WHEN sub.subject_name = 'Tamil' THEN m.marks_obtained ELSE 0 END) AS Tamil,
                MAX(CASE WHEN sub.subject_name = 'Maths' THEN m.marks_obtained ELSE 0 END) AS Maths,
                MAX(CASE WHEN sub.subject_name = 'Science' THEN m.marks_obtained ELSE 0 END) AS Science,
                MAX(CASE WHEN sub.subject_name = 'Social' THEN m.marks_obtained ELSE 0 END) AS Social,
                SUM(m.marks_obtained) AS total_marks,
                CASE 
                    WHEN MIN(m.marks_obtained) < 40 THEN 'Failed' 
                    ELSE 'Passed' 
                END AS status,
                NULL AS \`rank\`
            FROM students st
            JOIN marks m ON st.id = m.student_id
            JOIN subjects sub ON m.subject_id = sub.id
            GROUP BY st.id, m.exam_id
        `);

        // Step 4: Update rank for passed students
        await db.promise().query(`SET @rank := 0`);
        await db.promise().query(`
            UPDATE ranking 
            SET \`rank\` = (@rank := @rank + 1) 
            WHERE status = 'Passed' 
            ORDER BY total_marks DESC
        `);

        // Step 5: Fetch ranked students
        const [results] = await db.promise().query(`
            SELECT student_id, student_name, exam_id, English, Tamil, Maths, Science, Social, total_marks, status, \`rank\`
            FROM ranking
            ORDER BY total_marks DESC
        `);

        return res.status(200).json({ success: true, ranking: results });
    } catch (error) {
        console.error("Error generating rank:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
};


exports.getStudentRanking = async (req, res) => {
    try {
        const { student_id } = req.params;
        if (!student_id) {
            return res.status(400).json({ success: false, message: "Student ID is required" });
        }

        const [result] = await db.promise().query(
            `SELECT student_id, student_name, exam_id, English, Tamil, Maths, Science, Social, total_marks, status, \`rank\`
             FROM ranking
             WHERE student_id = ?`, 
            [student_id]
        );

        if (result.length === 0) {
            return res.status(404).json({ success: false, message: "Student not found in ranking" });
        }

        return res.status(200).json({ success: true, studentRanking: result[0] });
    } catch (error) {
        console.error("Error fetching student ranking:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
};
