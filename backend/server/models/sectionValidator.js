const z = require('zod');

const newSectionValidation = data => {
  const sectionValidationSchema = z.object({
    title: z.string().min(3, 'Title must be 3 characters or more'),
    description: z.string(),
    courses: z.array(z.string().min(24, 'Invalid course ID')).optional(),
  });

  return sectionValidationSchema.safeParse(data);
};

module.exports.newSectionValidation = newSectionValidation;
