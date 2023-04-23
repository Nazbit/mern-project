const express = require("express");
const router = express.Router();
const Section = require("../../models/sectionModel");
const Course = require("../../models/courseModel");

// DELETE route to remove a course from a section
async function deleteCourseFromSection(courseId) {
  try {
    const sections = await Section.find({ courses: courseId });

    // Remove the course's ID from the courses array of each section
    const updates = sections.map(async (section) => {
      section.courses = section.courses.filter((id) => id.toString() !== courseId.toString());
      await section.save();
    });

    // Wait for all updates to complete
    await Promise.all(updates);
  } catch (err) {
    console.error(err);
  }
}

module.exports = deleteCourseFromSection;
