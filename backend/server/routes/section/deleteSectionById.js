const express = require('express');
const router = express.Router();
const courseModel = require('../../models/courseModel');
const sectionModel = require('../../models/sectionModel');

router.delete('/deleteSectionById/:id', async (req, res) => {
  const sectionId = req.params.id;
  
  try {
    // Find the section being deleted
    const deletedSection = await sectionModel.findByIdAndDelete(sectionId);

    if (!deletedSection) {
      return res.status(404).json({ message: 'Section ' + sectionId + ' not found' });
    }

    // Find all courses that reference the deleted section
    const affectedCourses = await courseModel.find({ section: sectionId });

    // Update each affected course to set the section field to null
    const updates = affectedCourses.map(course => {
      course.section = null;
      return course.save();
    });

    // Wait for all updates to complete
    await Promise.all(updates);

    res.json({ message: 'Section deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting section' });
  }
});



module.exports = router;