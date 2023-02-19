const z = require('zod')

//validates when new course is created
const newSectionValidation = data => { 
  const sectionValidationSchema = z.object({
    title : z.string().min(3, 'Title must be 3 characters or more'),
    description: z.string().required('Please enter a description'),

  });
  
  
};



module.exports.newSectionValidation = newSectionValidation;
