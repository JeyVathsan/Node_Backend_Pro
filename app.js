const express = require('express');
const app = express();

// Import routes
const studentRoutes = require('./routes/studentRoutes');
const examRoutes = require('./routes/examRoutes'); // Add this line for exam routes
const subjectRoutes = require('./routes/subjectRoutes');
const marksRoutes = require('./routes/marksRoutes');
const rankingRoutes= require('./routes/rankingRoutes')
// Middleware to parse JSON data
app.use(express.json());

// Use routes
app.use('/students', studentRoutes);
app.use('/exams', examRoutes); // Add this line for exam routes
app.use('/subjects', subjectRoutes);
app.use('/marks', marksRoutes);
app.use('/ranking',rankingRoutes)



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
