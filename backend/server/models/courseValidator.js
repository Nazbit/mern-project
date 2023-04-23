const z = require('zod');

const newCourseValidation = data => {
  const courseValidationSchema = z.object({
    title: z.string().min(3, 'Title must be 3 characters or more'),
    description: z.string(),
    section: z.string().min(24, 'Invalid section ID'),
    courseImage: z.string().optional(),
    content: z.string().optional(),
    quizzes: z.array(z.string().min(24, 'Invalid quiz ID')).optional(),
  });

  return courseValidationSchema.safeParse(data);
};

module.exports.newCourseValidation = newCourseValidation;
