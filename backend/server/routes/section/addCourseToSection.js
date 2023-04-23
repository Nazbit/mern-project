const express = require("express");
const router = express.Router();
const Section = require("../../models/sectionModel");
const Course = require("../../models/courseModel");

// POST route to add a course to a section
router.post("/sections/:sectionId/courses/:courseId", async (req, res) => {
  try {
    const section = await Section.findById(req.params.sectionId);
    if (!section) {
      return res.status(404).send(`Section with ID ${req.params.sectionId} not found`);
    }

    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).send(`Course with ID ${req.params.courseId} not found`);
    }
    //Check if course is not already in section
    if (section.courses.includes(course._id)) {
      return res.status(400).send(`Course with ID ${req.params.courseId} already exists in section with ID ${req.params.sectionId}`);
    }

    course.section = section._id; // Set the course's section to the specified section's ID
    await course.save(); // Save the course to the database

    section.courses.push(course._id); // Add the course's ID to the section's courses array
    await section.save(); // Save the updated section to the database

    res.status(200).send(section);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
