const express = require("express");
const router = express.Router();
const Section = require("../models/sectionModel");
const Course = require("../models/courseModel");

// DELETE route to remove a course from a section
router.delete("/sections/:sectionId/courses/:courseId", async (req, res) => {
  try {
    const section = await Section.findById(req.params.sectionId);
    if (!section) {
      return res.status(404).send(`Section with ID ${req.params.sectionId} not found`);
    }

    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).send(`Course with ID ${req.params.courseId} not found`);
    }

    if (!section.courses.includes(course._id)) {
      return res.status(400).send(`Course with ID ${req.params.courseId} does not exist in section with ID ${req.params.sectionId}`);
    }

    // Remove the course's ID from the section's courses array
    section.courses = section.courses.filter((courseId) => courseId.toString() !== course._id.toString());
    await section.save(); // Save the updated section to the database

    // Remove the section's ID from the course's section field
    course.section = null;
    await course.save(); // Save the updated course to the database

    res.status(200).send(section);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
