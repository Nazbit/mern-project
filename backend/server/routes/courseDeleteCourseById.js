const express = require('express');
const router = express.Router();
const newCourseModel = require('../models/courseModel');

router.delete('/deleteCourseById/:id', async (req, res) => {
  //var {courseId} =  req.body;
  await newCourseModel.findByIdAndDelete(req.params.id)
    .then(deletedCourse => {
      if (!deletedCourse) {
        return res.status(404).json({ message: 'Course ' + courseId+ ' not found' });
      }
      res.json({ message: 'Course deleted successfully' });
    })
    .catch(error => {
      res.status(500).json({ message: 'Error deleting course' });
    });
});

module.exports = router;