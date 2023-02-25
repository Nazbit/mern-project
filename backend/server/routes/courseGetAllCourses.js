const express = require('express');
const router = express.Router();
const newCourseModel = require('../models/courseModel');

router.get('/getAllCourses', async (req, res) => {
    const course = await newCourseModel.find();
    return res.json(course)
  })

module.exports = router;