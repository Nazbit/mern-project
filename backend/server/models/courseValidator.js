const z = require('zod')

//validates when new course is created
const newCourseValidation = data => { 
  const courseValidationSchema = z.object({
    title : z.string().min(3, 'Title must be 3 characters or more'),
    description: z.string().required('Please enter a description'),
    //section : z.string().required('Please enter a section'),
  });
  
  
};



module.exports.newCourseValidation = newCourseValidation;
