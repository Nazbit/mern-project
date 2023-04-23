const express = require("express");
const router = express.Router();
const z = require("zod");

const newCourseModel = require("../../models/courseModel");

router.put('/updateCourseById/:id', async (req, res) => {
  
  await newCourseModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(updatedCourse => {
        if (!updatedCourse) {
          return res.status(404).json({ message: `Course not found ${req.params.id}` });
        }
        res.json({ message: 'Course updated successfully', updatedCourse });
      })
      .catch(error => {
        res.status(500).json({ message: `Error updating course ${req.params.id}` });
      });
  });

module.exports = router;
