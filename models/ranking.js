const db = require('../config/db');

exports.generateRank = () => {
    return new Promise((resolve, reject) => {
        const query = `
            SET @rank := 0;

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
                CASE
                    WHEN MIN(m.marks_obtained) < 40 THEN NULL
                    ELSE @rank := @rank + 1
                END AS \`rank\`
            FROM students st
            JOIN marks m ON st.id = m.student_id
            JOIN subjects sub ON m.subject_id = sub.id
            GROUP BY st.id, m.exam_id;

            SET @rank := 0;

            SELECT
                student_id,
                student_name,
                exam_id,
                English,
                Tamil,
                Maths,
                Science,
                Social,
                total_marks,
                status,
                CASE 
                    WHEN status = 'Passed' THEN (@rank := @rank + 1)
                    ELSE NULL
                END AS \`rank\`
            FROM (
                SELECT 
                    st.id AS student_id,
                    st.name AS student_name,
                    m.exam_id,
                    MAX(CASE WHEN s.subject_name = 'English' THEN m.marks_obtained ELSE 0 END) AS English,
                    MAX(CASE WHEN s.subject_name = 'Tamil' THEN m.marks_obtained ELSE 0 END) AS Tamil,
                    MAX(CASE WHEN s.subject_name = 'Maths' THEN m.marks_obtained ELSE 0 END) AS Maths,
                    MAX(CASE WHEN s.subject_name = 'Science' THEN m.marks_obtained ELSE 0 END) AS Science,
                    MAX(CASE WHEN s.subject_name = 'Social' THEN m.marks_obtained ELSE 0 END) AS Social,
                    SUM(m.marks_obtained) AS total_marks,
                    CASE 
                        WHEN MIN(m.marks_obtained) < 40 THEN 'Failed'
                        ELSE 'Passed'
                    END AS status
                FROM students st
                JOIN marks m ON st.id = m.student_id
                JOIN subjects s ON m.subject_id = s.id
                GROUP BY st.id, m.exam_id
            ) AS ranking_data
            ORDER BY total_marks DESC;
        `;

        db.query(query, (err, results) => {
            if (err) {
                console.error('SQL Error:', err);  // Log the SQL error
                reject(err);
            }
            resolve(results);
        });
    });
};
