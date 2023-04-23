const express = require("express");
const router = express.Router();
const z = require("zod");


const newQuestionModel = require("../../models/questionModel");

router.get("/getQuestionById/:id", async (req, res) => {

  try {
    const question = await newQuestionModel.findById(req.params.id);
    if (question == null) {
      res.status(404).send(`Question with id ${req.params.id} does not exist.`);
    } else {
      return res.json(question);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
