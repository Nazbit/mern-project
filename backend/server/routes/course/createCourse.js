const express = require("express");
const router = express.Router();
const newCourseModel = require('../../models/courseModel')

router.post("/createCourse", async (req, res) => { 
  const { title, description,courseImage,content,section } = req.body

  const createNewCourse = newCourseModel({
    title: title,
    description: description,
    section: section,
    courseImage: courseImage,
    content: content,
  })
  
  try {
    const newCourse = await newCourseModel.create(createNewCourse)
    res.json({ id: newCourse._id, msg: 'Course created successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Could not create course' });
  }
})

module.exports = router;
