const express = require("express");
const router = express.Router();
const rankingController = require("../controllers/rankingController"); 

router.post("/generate", rankingController.generateRanking); 
router.get("/ranking/:student_id", rankingController.getStudentRanking);

module.exports = router;
