const mongoose = require("mongoose");

//Course schema/model
const newSectionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            label: "title",
            min: 3,
        },

        description: {
            type: String,
            required: true,
            label: "description",
        },
    },


    { collection: "sections" }
);

module.exports = mongoose.model('sections', newSectionSchema)