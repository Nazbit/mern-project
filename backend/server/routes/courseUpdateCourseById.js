const express = require("express");
const router = express.Router();
const z = require("zod");

const newCourseModel = require("../models/courseModel");

router.put('/updateCourseById/:id', (req, res) => {
  var { courseId } = req.body;
  newCourseModel.findByIdAndUpdate(courseId, req.body, {new: true})
      .then(updatedCourse => {
        if (!updatedCourse) {
          return res.status(404).json({ message: 'Course not found '+courseId  });
        }
        res.json({ message: 'Course updated successfully', updatedCourse });
      })
      .catch(error => {
        res.status(500).json({ message: 'Error updating course'+courseId });
      });
  });

  module.exports = router;