const express = require("express");
const router = express.Router();
const z = require("zod");


const newSectionModel = require("../models/sectionModel");

router.get("/getSectionById/:id", async (req, res) => {

  try {
    const section = await newSectionModel.findById(req.params.id);
    if (section == null) {
      res.status(404).send(`Section with id ${req.params.id} does not exist.`);
    } else {
      return res.json(section);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
