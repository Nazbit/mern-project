const express = require("express");
const router = express.Router();
const z = require("zod");

const newSectionModel = require("../../models/sectionModel");

router.put('/updateSectionById/:id', async (req, res) => {
  
  await newSectionModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(updatedSection => {
        if (!updatedSection) {
          return res.status(404).json({ message: 'SSection not found '+sectionId  });
        }
        res.json({ message: 'Section updated successfully ', updatedSection });
      })
      .catch(error => {
        res.status(500).json({ message: 'Error updating section '+sectionId });
      });
  });

  module.exports = router;