const express = require('express');
const router = express.Router();
const newCourseModel = require('../models/courseModel');
const newSectionModel = require('../models/sectionModel');

router.delete('/deleteCourseById/:id', async (req, res) => {
  try {
    const deletedCourse = await newCourseModel.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    const sectionId = deletedCourse.section;
    await newSectionModel.findByIdAndUpdate(sectionId, { $pull: { courses: deletedCourse._id } });
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting course' });
  }
});

module.exports = router;
