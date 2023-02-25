const express = require("express");
const router = express.Router();
const z = require("zod");


const newSectionModel = require("../models/sectionModel");

router.get("/getSectionById", async (req, res) => {
  var { sectionId } = req.body;

  newSectionModel.findById(sectionId, function (err, section) {
    if (err) {
      console.log(err);
    }
    if (section==null) {
      res.status(404).send("sectionId does not exist.");
    } 
    else {
      return res.json(section);
    }
  });
});

module.exports = router;