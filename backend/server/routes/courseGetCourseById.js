const express = require("express");
const router = express.Router();
const z = require("zod");


const newCourseModel = require("../models/courseModel");

router.get("/getCourseById", async (req, res) => {
  var { courseId } = req.body;

  newCourseModel.findById(courseId, function (err, course) {
    if (err) {
      console.log(err);
    }
    if (course==null) {
      res.status(404).send("courseId does not exist.");
    } 
    else {
      return res.json(course);
    }
  });
});

module.exports = router;
