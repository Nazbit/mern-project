const express = require("express");
const router = express.Router();
const z = require("zod");


const newQuizModel = require("../../models/quizModel");

router.get("/getQuizById/:id", async (req, res) => {

  try {
    const quiz = await newQuizModel.findById(req.params.id);
    if (quiz == null) {
      res.status(404).send(`Quiz with id ${req.params.id} does not exist.`);
    } else {
      return res.json(quiz);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
