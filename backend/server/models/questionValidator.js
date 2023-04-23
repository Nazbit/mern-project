const z = require('zod');

const questionValidation = data => {
  const questionValidationSchema = z.object({
    questionText: z.string(),
    options: z.array(z.string()),
    correctAnswer: z.number(),
    explanation: z.string().optional(),
    image: z.string().optional(),
    difficulty: z.string().optional(),
    tags: z.array(z.string()).optional(),
    quiz: z.string().min(24, 'Invalid quiz ID').optional(),
  });

  return questionValidationSchema.safeParse(data);
};

module.exports.questionValidation = questionValidation;
