const express = require("express");
const router = express.Router();
const newSectionModel = require('../models/sectionModel')

router.post("/createSection", async (req, res) => { 
  const { title, description } = req.body

  const createNewSection = newSectionModel({
    title: title,
    description: description,
  })
  
  const response = await newSectionModel.create(createNewSection)
  .then(section => res.json({ msg: 'Section created successfully' }))
  .catch(err => res.status(404).json({ error: 'Could not create section' }));
})

module.exports = router;