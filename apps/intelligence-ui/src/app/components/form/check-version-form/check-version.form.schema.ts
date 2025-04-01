import { z } from 'zod';

export const CheckFormSchema = z.object({
  version: z
    .string()
    .nonempty()
    .regex(/(\d).(\d)\.(\d)$/, {
      message: 'must have three decimal points to check version',
    }),
});

export type SemanticFormType = z.infer<typeof CheckFormSchema>;
