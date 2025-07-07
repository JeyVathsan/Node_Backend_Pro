# 🎓 Student Marks Register - Backend API

This is a **Node.js + Express** backend project connected with **MySQL** using **Sequelize** ORM.  
It is designed to manage **student marks**, calculate **average scores**, determine **pass/fail status**, and rank students based on total marks.

---

## 🚀 Features

- Register a new student with marks.
- Fetch all marks of a student by ID.
- Delete a student record.
- Calculate:
  - Total marks
  - Pass/Fail status (based on each subject >= 40)
  - Student ranking (only for passed students)

---

## 🧠 Ranking Logic (SQL)

This project includes advanced SQL to:
- Aggregate subject-wise marks.
- Determine Pass/Fail (if **any subject < 40 → Fail**).
- Assign ranks based on **total marks**.
- Skip ranks for failed students.

