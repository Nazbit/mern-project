const express = require("express");
const router = express.Router();
const z = require("zod");


const newCourseModel = require("../../models/courseModel");

router.get("/getCourseById/:id", async (req, res) => {

  try {
    const course = await newCourseModel.findById(req.params.id);
    if (course == null) {
      res.status(404).send(`Course with id ${req.params.id} does not exist.`);
    } else {
      return res.json(course);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
