const z = require('zod');

const quizValidation = data => {
  const quizValidationSchema = z.object({
    title: z.string().min(3, 'Title must be 3 characters or more'),
    questions: z.array(z.string().min(24, 'Invalid question ID')),
    explanation: z.string().optional(),
    course: z.string().min(24, 'Invalid course ID'),
  });

  return quizValidationSchema.safeParse(data);
};

module.exports.quizValidation = quizValidation;
