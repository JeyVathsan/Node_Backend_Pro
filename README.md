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

| Package         | Version | Purpose                                                          |
| --------------- | ------- | ---------------------------------------------------------------- |
| **express**     | ^4.21.2 | Web framework for building RESTful APIs                          |
| **mysql2**      | ^3.12.0 | MySQL client for Node.js (used by Sequelize under the hood)      |
| **sequelize**   | ^6.37.5 | Promise-based ORM for handling MySQL queries                     |
| **dotenv**      | ^16.4.7 | Loads environment variables from a `.env` file                   |
| **body-parser** | ^1.20.3 | Parses incoming JSON and form data in requests                   |
| **cors**        | ^2.8.5  | Enables Cross-Origin Resource Sharing to allow frontend requests |
| **nodemon**     | ^3.1.9  | Development tool that auto-restarts the server on file changes   |


git clone https://github.com/JeyVathsan/Node_Backend_Pro.git
cd Node_Backend_Pro
npm install


DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=yourdbname
PORT=3000

npm run dev


| Method | Endpoint               | Description                        |
| ------ | ---------------------- | ---------------------------------- |
| GET    | `/students/:id`        | Get all marks for a student        |
| POST   | `/students`            | Add a student and their marks      |
| DELETE | `/students/:id`        | Delete a student by ID             |
| GET    | `/students/:id/result` | Get total, average, pass/fail      |
| GET    | `/ranking`             | Get ranked list of passed students |



Let me know if you'd like to:
- Add example request/response JSON for each route
- Include DB schema or ERD section
- Add screenshots or Postman collection

I'll help you clean it up even more if needed.


