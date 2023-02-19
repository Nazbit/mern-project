const mongoose = require("mongoose");

//Course schema/model
const newCourseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            label: "title",
            min : 3,
        },
       
        description: {
            type: String,
            required: true,
            label: "description",
        },
        section:{
            type:String,
            label:"section"
        },
        courseImage: {
            type: Buffer,
            label: "courseImage",
        },
        content: {
            type: String,
            label: "content"
        },
        date: {
            type: Date,
            default: Date.now,
        }
    },

    { collection: "courses" }
);

module.exports = mongoose.model('courses', newCourseSchema)