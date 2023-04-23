const express = require('express');
const router = express.Router();
const newCourseModel = require('../../models/courseModel');

// Route to get all courses
router.get('/getAllCourses', async (req, res) => {
  try{ 
  const course = await newCourseModel.find();
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;